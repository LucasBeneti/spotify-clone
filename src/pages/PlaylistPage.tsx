import { useState } from "react";
import {
  Clock,
  Play,
  Heart,
  MusicNotesSimple,
  PencilSimple,
} from "@phosphor-icons/react";
import { useParams, Link } from "react-router-dom";
import { getSongDurationInMinutes } from "../utils";
import { SongItem } from "../components/reusable/SongItem";
import { BigPlayButton } from "../components/reusable/BigPlayButton";
import { getPlaylistFullInfo } from "../services/playlistServices";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../components/Modal";

type SongData = {
  name: string;
  artist: string;
  album: string;
  album_name?: string;
  album_id?: string;
  date_added: Date;
  duration: number;
};

// TODO duplicate?
type PlaylistData = {
  cover_src: string;
  name: string;
  author: string;
  liked: boolean;
  songs: SongData[];
};

export const PlaylistPage = () => {
  const [showModal, setShowModal] = useState(true);
  const { id } = useParams();
  // const [likedPlaylist, setLikedPlaylist] = useState(playlistData?.liked);
  const [cookies] = useCookies(["user_jwt"]);
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
  const handlePlayThis = (song: SongData) => {
    console.log("Now playing...", song);
    // here we would call the function from the context to play the song
  };

  const handleLikePlaylist = () => {
    // TODO implement this feature
    // setLikedPlaylist(!likedPlaylist);
    console.log("Liked this playlist");
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
          <div>
            <p className="text-xs">Playlist</p>
            <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-6">
              {playlistData?.name}
            </h3>
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
                    onClick={() => handlePlayThis(song)}
                    key={`${song}_${index}`}
                  >
                    <td className="text-sm p-4 text-white ">
                      <span className="flex justify-center items-center">
                        <span className="block group-hover/item:hidden px-2">
                          {index + 1}
                        </span>
                        <span className="hidden group-hover/item:block">
                          <Play size={14} weight="fill" fill="white" />
                        </span>
                      </span>
                    </td>
                    <td className="text-sm p-4 text-left text-white">
                      <SongItem
                        artist={song.artist}
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
                      {getSongDurationInMinutes(song.duration)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </main>
      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <NewPlaylistModalContent />
        </Modal>
      )}
    </>
  );
};

const NewPlaylistModalContent = () => {
  return (
    <section className="grid w-full gap-4 grid-cols-5 transition pb-3">
      <span className="w-44 h-44  group/item flex items-center justify-center shadow-neutral-900 shadow-md bg-[#2a2a2a] col-span-2 hover:cursor-pointer">
        <span className="block group-hover/item:hidden">
          <MusicNotesSimple size={48} fill="#a7a7a7" className="" />
        </span>
        <span className="hidden group-hover/item:block">
          <PencilSimple size={48} fill="#a7a7a7" className="" />
        </span>
      </span>
      <span className="col-span-3 grid grid-rows-4 gap-3">
        <input
          id="playlistname"
          name="playlistname"
          type="text"
          className="row-span-1 rounded-md bg-inputfocus py-1 pl-3 outline-none text-sm placeholder-subdued"
          placeholder="Título (Ex: Melhor playlist)"
          spellCheck="false"
        />
        <textarea
          name="playlistdescription"
          id="playlistdescription"
          className="w-full row-span-3 rounded-md bg-inputfocus px-3 pt-3 pb-6 outline-none resize-none text-sm placeholder-subdued"
          placeholder="Adicione uma descrição opcional"
          spellCheck="false"
        ></textarea>
      </span>
      <section className="justify-end items-center w-full grid col-span-2 col-start-5 col-end-6">
        <button className="py-3 px-8 bg-white text-black focus:bg-black focus-text-white rounded-full font-bold transition-transform delay-150 hover:scale-105">
          Salvar
        </button>
      </section>
      <section className="grid col-span-5 font-bold text-xs text-white">
        <span>
          Ao continuar, você autoriza o Spotify a acessar a imagem enviada.
          Certifique-se de que você tem o direito de fazer o upload dessa
          imagem.
        </span>
      </section>
    </section>
  );
};
