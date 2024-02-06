import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Play } from "@phosphor-icons/react";
import { BigPlayButton, VerticalCard, SongItem } from "@components/reusable";
import { Album, type Song } from "@contexts/AudioPlayerReducer";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";
import { getSongDurationInMinutes } from "@utils/songs";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const [cookies] = useCookies(["user_jwt"]);
  const [showMoreSongs, setShowMoreSongs] = useState(false);
  const { playSongNow } = useCustomAudioContext();
  const { data } = useQuery({
    queryKey: ["artist_data", artistId],
    queryFn: async () => {
      const userToken = cookies.user_jwt;
      const response = await fetch(`${SERVER_URL}/artist/${artistId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return await response.json();
    },
  });

  const artistInfo = data?.artistInfo ? data.artistInfo : {};
  const artistAlbums = data?.albums;
  const mostPlayedSongs = data?.mostPlayedSongs ? data?.mostPlayedSongs : null;

  const handlePlayArtistSong = () => {
    console.log(`play the first song for ${artistId}`);
  };

  const handleFollowArtist = () => {
    console.log(`follow artist ${artistId}`);
  };

  const artistCoverImage = useRef<HTMLImageElement>(null);

  const handleImgError = () => {
    if (artistCoverImage.current) {
      artistCoverImage.current.src =
        "https://images.unsplash.com/photo-1549834125-82d3c48159a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto">
        <header className="h-72 w-full bg-highlight">
          <img
            src={artistInfo.page_cover_img}
            alt={`${artistId} Banner`}
            className="h-96 w-full object-cover overflow-hidden rounded"
            onError={handleImgError}
            ref={artistCoverImage}
          />
          <h1 className="text-8xl font-bold font-display top-48 px-4 -translate-y-24">
            {artistInfo.name}
          </h1>
        </header>
        <main className="mt-32 px-4 pb-4">
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
            <h3 className="text-xl font-display font-bold mb-4">
              Most popular
            </h3>
            <table className="table-auto border-collapse bg-transparent w-full">
              <tbody>
                {mostPlayedSongs &&
                  mostPlayedSongs.map((song: Song, index: number) => {
                    const renderCondition = showMoreSongs
                      ? index <= 9
                      : index <= 4;
                    if (renderCondition) {
                      return (
                        <tr
                          className="group/item hover:bg-highlight transition cursor-pointer"
                          key={`${song}_${index}`}
                        >
                          <td
                            className="text-sm p-4 text-white text-center flex justify-center w-16"
                            onClick={() => playSongNow(song)}
                          >
                            <span className="block group-hover/item:hidden px-2">
                              {index + 1}
                            </span>
                            <span className="hidden group-hover/item:block px-2">
                              <Play size={14} weight="fill" fill="white" />
                            </span>
                          </td>
                          <td className="text-sm p-4 text-left text-white">
                            <SongItem song={song} variant="artist-page" />
                          </td>
                          <td className="text-sm p-4 text-left text-white">
                            {song.album_name}
                          </td>
                          <td className="text-sm p-4 text-left text-white">
                            9 de jun. de 2022
                          </td>
                          <td className="p-4 text-left text-white">
                            {getSongDurationInMinutes(song.duration)}
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
            <button
              onClick={() => setShowMoreSongs(!showMoreSongs)}
              className="bg-transparent text-subdued hover:text-white font-sm font-sans font-bold my-4"
            >
              {showMoreSongs ? "Mostrar menos" : "Ver mais"}
            </button>
          </section>
          <section>
            <h3 className="text-xl font-display font-bold mb-4">Discography</h3>
            <section className="flex gap-x-6 scroll-smooth overflow-x-auto">
              {artistAlbums &&
                artistAlbums.map((album: Album) => (
                  <Link
                    to={`/album/${album.id}`}
                    key={`${album.name}_${album.id}`}
                  >
                    <VerticalCard
                      title={album.name}
                      subtitle={album.launch_year}
                      coverSrc={album.cover_art}
                      key={album.id}
                    />
                  </Link>
                ))}
            </section>
          </section>
        </main>
      </div>
    </>
  );
};
