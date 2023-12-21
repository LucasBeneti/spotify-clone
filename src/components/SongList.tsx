import { Song } from "../contexts/AudioPlayerReducer";
import { SongItem } from "./reusable/SongItem";

type SongListProps = {
  songs: Song[];
};

export const SongList = ({ songs }: SongListProps) => {
  return (
    <ul className="flex flex-1 flex-col gap-y-2">
      {songs.map((song) => {
        return <SongItem song={song} variant="search" />;
      })}
    </ul>
  );
};
