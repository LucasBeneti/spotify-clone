import { useState } from "react";
import { Clock, Play, Heart } from "@phosphor-icons/react";
import { useParams, Link } from "react-router-dom";
import { getSongDurationInMinutes } from "../utils";
import { SongItem } from "../components/reusable/SongItem";
import { BigPlayButton } from "../components/reusable/BigPlayButton";
import { getPlaylistFullInfo } from "../services/playlistServices";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../components/Modal";
import { PlaylistModalContent } from "../components/PlaytlistModalContent";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";

import type { Song } from "../contexts/AudioPlayerReducer";

// TODO duplicate?
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
  // const [likedPlaylist, setLikedPlaylist] = useState(playlistData?.liked);
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

  // TODO create the function that will actually play the song, given some information
  const handlePlayThis = (song: Song) => {
    console.log("Now playing...", song);
    playSongNow(song);
    // here we would call the function from the context to play the song
  };

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

        return await fetch(`http://localhost:3000/playlist/${id}`, {
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
      <header className="w-100 bg-gradient-to-b from-cyan-950 to-base h-96">
        <section className="flex gap-x-4 items-end mt-24 px-6">
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
      <main className="w-full px-6 -translate-y-24 bg-base bg-opacity-10">
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
                  <tr
                    className="group/item hover:bg-highlight transition cursor-pointer"
                    key={`${song}_${index}`}
                  >
                    <td className="text-sm p-4 text-white ">
                      <span className="flex justify-center items-center">
                        <span className="block group-hover/item:hidden px-2">
                          {index + 1}
                        </span>
                        <span
                          onClick={() => handlePlayThis(song)}
                          className="hidden group-hover/item:block"
                        >
                          <Play size={14} weight="fill" fill="white" />
                        </span>
                      </span>
                    </td>
                    <td className="text-sm p-4 text-left text-white">
                      <SongItem
                        artist={{ name: song.artist_name, id: song.author_id }}
                        name={song.name}
                        imgSrc={playlistData.cover_src}
                        variant="playlist"
                      />
                    </td>
                    <td className="text-sm p-4 text-left text-white hover:underline">
                      <Link to={`/album/${song.album_id}`}>
                        {song.album_name}
                      </Link>
                    </td>
                    <td className="text-sm p-4 text-left text-white">
                      9 de jun. de 2022
                    </td>
                    <td className="p-4 text-left text-white">
                      {getSongDurationInMinutes(song?.duration)}
                    </td>
                  </tr>
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
    </>
  );
};
