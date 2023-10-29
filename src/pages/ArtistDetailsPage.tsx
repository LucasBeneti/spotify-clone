import { useParams } from "react-router-dom";
import { Play } from "@phosphor-icons/react";
import { VerticalCard } from "../components/VerticalCard";
import { getSongDurationInMinutes } from "../utils";
import { BigPlayButton } from "../components/reusable/BigPlayButton";
const songs = [
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
];

const albums = [
  {
    name: "Flower Boy",
    coverSrc:
      "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
    launch_year: "2017",
  },
  {
    name: "Igor",
    coverSrc:
      "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
    launch_year: "2019",
  },
  {
    name: "Call Me If You Get Lost",
    coverSrc:
      "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
    launch_year: "2021",
  },
];

export const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const handlePlayArtistSong = () => {
    console.log(`play the first song for ${artistId}`);
  };

  const handleFollowArtist = () => {
    console.log(`follow artist ${artistId}`);
  };

  const handlePlayThis = (song) => {
    console.log("play song", song);
  };
  // TODO check the viability to create pages like variants, since the structure seems to be pretty close between each other
  return (
    <>
      <header className="h-64 w-full bg-highlight">
        <span className="w-full border-t-md">
          <img
            src="https://images.unsplash.com/photo-1549834125-82d3c48159a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt={`${artistId} Banner`}
            className="h-72 w-full object-cover overflow-hidden rounded"
          />
        </span>
        <h1 className="text-8xl font-bold font-display absolute top-48 px-4">
          {artistId}
        </h1>
      </header>
      <main className="mt-16 px-4 pb-4">
        <section className="flex gap-x-4 items-center">
          <BigPlayButton onClickHandle={handlePlayArtistSong} />
          <button
            onClick={handleFollowArtist}
            className="h-8 py-0 px-6 border border-gray-600 hover:border-white text-white text-xs font-bold rounded-full hover:cursor-pointer hover:scale-105 transition delay-75"
          >
            Follow
          </button>
        </section>
        <section className="mt-6">
          <h3 className="text-xl font-display font-bold mb-4">Most popular</h3>
          <table className="table-auto border-collapse bg-transparent w-full">
            <tbody>
              {songs.map((song, index) => {
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
              })}
            </tbody>
          </table>
        </section>
        <section>
          <h3 className="text-xl font-display font-bold mb-4">Discography</h3>
          <section className="flex gap-x-6 scroll-smooth overflow-x-auto">
            {albums.map((album) => (
              <VerticalCard
                title={album.name}
                subtitle={album.launch_year}
                coverSrc={album.coverSrc}
              />
            ))}
          </section>
        </section>
      </main>
    </>
  );
};
