import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Clock, Heart } from "@phosphor-icons/react";
import { BigPlayButton, Modal } from "@components/reusable";
import { PlaylistModalContent } from "@components/playlist/PlaylistModalContent";
import { getPlaylistFullInfo } from "@services/playlistServices";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";

import type { Song } from "@contexts/AudioPlayerReducer";

import { SongRow } from "@components/reusable/SongRow";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type PlaylistData = {
  cover_src: string;
  name: string;
  description: string;
  author: string;
  liked: boolean;
  songs: Song[];
};

type PlaylistInfoDTO = {
  name?: string;
  description?: string;
};

export const PlaylistPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [cookies] = useCookies(["user_jwt"]);
  const { playSongNow } = useCustomAudioContext();

  // TODO implement the error handling for this
  const { data: playlistData, isLoading } = useQuery<PlaylistData | null>({
    queryKey: ["playlist_data", id],
    queryFn: async () => {
      if (!id) return null;

      const userToken = cookies.user_jwt;
      const playlistData = await getPlaylistFullInfo(userToken, id);
      return playlistData;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleLikePlaylist = () => {
    // TODO implement this feature
    // setLikedPlaylist(!likedPlaylist);
    console.log("Liked this playlist");
  };

  const [playlistInfo, setPlaylistData] = useState<PlaylistInfoDTO>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name;
    const fieldData = e.target.value;

    setPlaylistData((prev) => ({ ...prev, [fieldName]: fieldData }));
  };

  const handleSaveEdit = async () => {
    try {
      if (id && playlistInfo?.name) {
        console.log("sending new playlist data", {
          ...playlistInfo,
          playlist_id: id,
        });

        return await fetch(`${SERVER_URL}/playlist/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${cookies.user_jwt}` },
          body: JSON.stringify({
            name: playlistInfo?.name,
            description: playlistInfo?.description,
          }),
        });
      }
    } catch (error) {
      console.error("Erro while trying to submit the edit.", error);
    }
  };
  // TODO create a way to select random colors (from an array for example)
  // to be the color for this gradient on the header of the playlist
  return (
    <>
      <div className="overflow-y-auto bg-gradient-to-b from-cyan-950 to-base">
        <header className="w-100">
          <section className="flex gap-x-4 items-end px-6 mt-20">
            <img
              src={playlistData?.cover_src}
              alt="playlist cover art"
              className="w-48"
            />
            <div onClick={() => setShowModal(true)}>
              <p className="text-xs">Playlist</p>
              <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-2">
                {playlistData?.name}
              </h3>
              <p className="text-sm text-white mb-6">
                {playlistData?.description}
              </p>
              <p className="text-xs font-bold">{playlistData?.author}</p>
            </div>
          </section>
        </header>
        <main className="w-full px-6 bg-base bg-opacity-10">
          <section className="flex gap-x-8 items-center my-8">
            <BigPlayButton
              onClickHandle={() => {
                console.log("play this playlist");
              }}
            />
            <button
              onClick={handleLikePlaylist}
              className="hover:scale-105 transition-all delay-75"
            >
              <Heart fill="#1ed760" weight={"regular"} size={32} />
            </button>
          </section>
          <table className="table-auto border-collapse bg-transparent w-full">
            <thead className="my-2 border-b-neutral-800 border-b">
              <tr>
                <th className="p-4 text-center text-white">#</th>
                <th className="p-4 text-left text-white">Title</th>
                <th className="p-4 text-left text-white">Album</th>
                <th className="p-4 text-left text-white">Added</th>
                <th className="p-4 text-left text-white">
                  <Clock size={24} fill="#fff" />
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || !playlistData?.songs?.length ? (
                <tr>
                  <td>
                    <h2>Loading...</h2>
                  </td>
                </tr>
              ) : (
                playlistData.songs?.map((song, index) => {
                  return (
                    <SongRow
                      song={song}
                      idx={index}
                      handlePlaySong={playSongNow}
                      key={`${song.name}_${index}`}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </main>
        {showModal && (
          <Modal
            handleClose={() => setShowModal(false)}
            title="Editar Playlist Information"
          >
            <PlaylistModalContent
              handleChange={handleChange}
              handleSaveEdit={handleSaveEdit}
              defaultValues={{
                name: playlistData?.name,
                description: playlistData?.description,
              }}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
