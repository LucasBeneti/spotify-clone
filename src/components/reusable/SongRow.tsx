import { memo } from "react";
import { Play } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { getSongDurationInMinutes } from "@utils/songs";
import { SongItem } from "@components/reusable/SongItem";
import type { Song } from "@contexts/AudioPlayerReducer";

type SongRowParams = {
  song: Song;
  idx: number;
  handlePlaySong: (s: Song) => void;
  key: string;
};

const SongRow = ({ song, idx, handlePlaySong }: SongRowParams) => {
  return (
    <tr className="group/item hover:bg-highlight transition cursor-pointer">
      <td className="text-sm p-4 text-white w-16">
        <span className="flex justify-center items-center">
          <span className="block group-hover/item:hidden px-2">{idx + 1}</span>
          <span
            onClick={() => handlePlaySong(song)}
            className="hidden group-hover/item:block"
          >
            <Play size={14} weight="fill" fill="white" />
          </span>
        </span>
      </td>
      <td className="text-sm p-4 text-left text-white">
        <SongItem song={song} variant="playlist" />
      </td>
      <td className="text-sm p-4 text-left text-white hover:underline">
        <Link to={`/album/${song.album_id}`}>{song.album_name}</Link>
      </td>
      <td className="text-sm p-4 text-left text-white">9 de jun. de 2022</td>
      <td className="p-4 text-left text-white">
        {getSongDurationInMinutes(song?.duration)}
      </td>
    </tr>
  );
};

export default memo(SongRow);
