import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Clock, Play, Heart } from "@phosphor-icons/react";
import { getSongDurationInMinutes } from "@utils/songs";
import { BigPlayButton, SongItem } from "@components/reusable";
import { getAlbumSongs, getAlbumFullInfo } from "@services/albumServices";
import { Song } from "@contexts/AudioPlayerReducer";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";

type AlbumFullInfo = {
  author_id: number;
  author_name: string;
  cover_art: string;
  launch_date: string;
  name: string;
  songs: Song[];
};

export const AlbumPage = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["user_jwt"]);
  const { playSongNow } = useCustomAudioContext();
  // TODO implement the error handling for this
  const { data: albumSongData, isLoading } = useQuery<AlbumFullInfo | null>({
    queryKey: ["album_data", id],
    queryFn: async () => {
      if (!id) return null;

      const userToken = cookies.user_jwt;
      const albumData = await getAlbumSongs(userToken, id);

      const albumBasicInfo = await getAlbumFullInfo(userToken, id);
      console.log("albumBasicInfo", albumBasicInfo);
      const albumFullInfo = {
        ...albumBasicInfo,
        songs: albumData,
      };
      console.log("albumData ", albumData);
      return albumFullInfo;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handlePlayThis = (song: Song) => {
    console.log("Now playing...", song);
    playSongNow(song);
  };

  const handleLikeAlbum = () => {
    // TODO implement this feature
    // setLikedPlaylist(!likedPlaylist);
    console.log("Liked this playlist");
  };

  return (
    <>
      <div className="overflow-y-auto bg-gradient-to-b from-cyan-950 to-base">
        <header className="w-100">
          <section className="flex gap-x-4 items-end mt-24 px-6">
            <img
              src={albumSongData?.cover_art}
              alt="playlist cover art"
              className="w-56 hover:scale-105 delay-100 transition-all"
            />
            <div>
              <p className="text-xs">Album</p>
              <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-6">
                {albumSongData?.name}
              </h3>
              <p className="text-xs font-bold">{albumSongData?.author_name}</p>
            </div>
          </section>
        </header>
        <main className="w-full h-full px-6  bg-base bg-opacity-10">
          <section className="flex gap-x-8 items-center my-8">
            <BigPlayButton
              onClickHandle={() => {
                console.log("play this playlist");
              }}
            />
            <button
              onClick={handleLikeAlbum}
              className="hover:scale-105 transition-all delay-75"
            >
              <Heart fill="#1ed760" weight={"regular"} size={32} />
            </button>
          </section>
          <section className="overflow-auto">
            <table className="table-auto border-collapse bg-transparent w-full">
              <thead className="my-2 border-b-neutral-800 border-b">
                <tr>
                  <th className="p-4 text-center text-white">#</th>
                  <th className="p-4 text-left text-white">Title</th>
                  <th className="p-4 text-left text-white">
                    <Clock size={24} fill="#fff" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td>
                      <h2>Loading...</h2>
                    </td>
                  </tr>
                ) : (
                  albumSongData?.songs?.map((song, index) => {
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
                          <SongItem song={song} variant="playlist" />
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
          </section>
        </main>
      </div>
    </>
  );
};
