import { Clock, Play } from "@phosphor-icons/react";
import { useNavigation, useLoaderData } from "react-router-dom";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";

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
  songs: SongData[];
};

export const PlaylistPage = () => {
  const data = useLoaderData() as PlaylistData;
  // const { isPlaying } = useCustomAudioContext();
  const { state } = useNavigation();

  // TODO create the function that will actually play the song, given some information
  const handlePlayThis = (song: SongData) => {
    console.log("Now playing...", song);
    // here we would call the function from the context to play the song
  };

  const getSongDurationInMinutes = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formattedString;
  };

  return (
    <>
      <div className="mx-4">
        <header className="w-100 bg-transparent mt-24">
          <section className="flex gap-x-4 items-end">
            <img
              src={data.cover_src}
              alt="playlist cover art"
              className="w-48"
            />
            <div>
              <p className="text-xs">Playlist</p>
              <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-6">
                {data.name}
              </h3>
              <p className="text-xs font-bold">{data.author}</p>
            </div>
          </section>
        </header>
        <main className="w-full">
          <table className="table-auto border-collapse bg-transparent w-full">
            <thead className="my-2">
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
                    >
                      <td className="text-sm p-4 text-white text-center flex justify-center">
                        <span className="block group-hover/item:hidden px-2">
                          {index + 1}
                        </span>
                        <span className="hidden group-hover/item:block">
                          <Play size={14} weight="fill" fill="white" />
                        </span>
                      </td>
                      <td className="text-sm p-4 text-left text-white">
                        {song.name}
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
      </div>
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
