import { Fragment } from "react";
import { Song } from "../../contexts/AudioPlayerReducer";
import { SongItem } from "./SongItem";

type SongListProps = {
  songs: Song[];
};

export const SongList = ({ songs }: SongListProps) => {
  return (
    <ul className="flex flex-1 flex-col gap-y-2">
      {songs.map((song, index) => {
        return (
          <Fragment key={`${song.name}_${index}`}>
            <SongItem song={song} variant="search" />
          </Fragment>
        );
      })}
    </ul>
  );
};
