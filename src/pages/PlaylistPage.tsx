import { Clock, Play, Heart } from "@phosphor-icons/react";
import { useNavigation, useLoaderData } from "react-router-dom";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";
import { getSongDurationInMinutes } from "../utils";
import { SongItem } from "../components/reusable/SongItem";
import { BigPlayButton } from "../components/reusable/BigPlayButton";
import { useState } from "react";

type SongData = {
  name: string;
  artist: string;
  album: string;
  date_added: Date;
  duration: number;
};

type PlaylistData = {
  cover_src: string;
  name: string;
  author: string;
  liked: boolean;
  songs: SongData[];
};

export const PlaylistPage = () => {
  const data = useLoaderData() as PlaylistData;
  const { state } = useNavigation();
  const [likedPlaylist, setLikedPlaylist] = useState(data.liked);

  // TODO create the function that will actually play the song, given some information
  const handlePlayThis = (song: SongData) => {
    console.log("Now playing...", song);
    // here we would call the function from the context to play the song
  };

  const handleLikePlaylist = () => {
    // TODO implement this feature
    setLikedPlaylist(!likedPlaylist);
    console.log("Liked this playlist");
  };
  // TODO create a way to select random colors (from an array for example)
  // to be the color for this gradient on the header of the playlist
  return (
    <>
      <header className="w-100 bg-gradient-to-b from-cyan-950 to-base h-96">
        <section className="flex gap-x-4 items-end mt-24 px-6">
          <img src={data.cover_src} alt="playlist cover art" className="w-48" />
          <div>
            <p className="text-xs">Playlist</p>
            <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-6">
              {data.name}
            </h3>
            <p className="text-xs font-bold">{data.author}</p>
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
            <Heart
              fill="#1ed760"
              weight={likedPlaylist ? "fill" : "regular"}
              size={32}
            />
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
            {state === "loading" ? (
              <h2>Loading...</h2>
            ) : (
              data.songs.map((song, index) => {
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
                        imgSrc={data.cover_src}
                        variant="playlist"
                      />
                    </td>
                    <td className="text-sm p-4 text-left text-white">
                      {song.album}
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
    </>
  );
};

export const playlistLoader = async ({ params }) => {
  const { id } = params;

  const res = new Promise((resolve, reject) => {
    resolve({
      cover_src:
        "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      name: "Kenny Beats Boiler Room Barcelona",
      author: "lucasbeneti",
      liked: true,
      songs: [
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
      ],
    });
  });

  return await res;
};
