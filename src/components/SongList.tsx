import { SongItem } from "./reusable/SongItem";

type SongListProps = {
  songs: {
    name: string;
    albumCoverArt: string;
    explicit?: boolean;
    liked?: boolean;
    authorName: string;
    albumName: string;
  }[];
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
