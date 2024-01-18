import { useState } from "react";
import { SongItem } from "./reusable/SongItem";
import { Play } from "@phosphor-icons/react";
import { getSongDurationInMinutes } from "../utils";
import type { Song } from "../contexts/AudioPlayerReducer";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";

type CustomTableProps = {
  songs: Song[];
  children?: React.ReactNode;
  enableShowMore?: boolean;
};

export const CustomTable = ({
  songs,
  enableShowMore = false,
}: CustomTableProps) => {
  const [showMoreSongs, setShowMoreSongs] = useState(false);
  const { playSongNow } = useCustomAudioContext();
  const handlePlaySong = (song: Song) => {
    console.log("playing", song);
    playSongNow(song);
  };
  return (
    <div id="table-wrapper" className="bg-transparent w-full">
      {!songs ? (
        <span>Empty list</span>
      ) : (
        songs.map((song: Song, index: number) => {
          const renderCondition = showMoreSongs ? index <= 9 : index <= 4;

          if (renderCondition) {
            return (
              <div
                className="group/item hover:bg-highlight transition cursor-pointer flex justify-between"
                onClick={() => handlePlaySong(song)}
                key={`${song}_${index}`}
              >
                <span className="text-sm p-4 text-white text-center flex justify-center w-24">
                  <span className="block group-hover/item:hidden px-2 self-center items-center">
                    {index + 1}
                  </span>
                  <span className="hidden group-hover/item:flex px-2 items-center">
                    <Play size={14} weight="fill" fill="white" />
                  </span>
                </span>
                <span className="text-sm p-4 text-left text-white w-[40%]">
                  <SongItem song={song} variant="artist-page" />
                </span>
                <span className="text-sm p-4 text-left text-white">
                  {song.album_name}
                </span>
                <span className="text-sm p-4 text-left text-white">
                  9 de jun. de 2022
                </span>
                <span className="p-4 text-left text-white">
                  {getSongDurationInMinutes(song.duration)}
                </span>
              </div>
            );
          }
        })
      )}

      {enableShowMore && (
        <button
          onClick={() => setShowMoreSongs(!showMoreSongs)}
          className="bg-transparent text-subdued hover:text-white font-sm font-sans font-bold my-4"
        >
          {showMoreSongs ? "Mostrar menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
};
