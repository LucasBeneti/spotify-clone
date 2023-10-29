import { SongItem } from "./reusable/SongItem";

type SongListProps = {
  songs: {
    name: string;
    albumCover: string;
    explicit?: boolean;
    liked?: boolean;
  }[];
  artist: string;
};

export const SongList = ({ songs, artist }: SongListProps) => {
  console.log(songs);
  return (
    <ul className="flex flex-1 flex-col gap-y-2">
      {songs.map(({ name, albumCover, explicit, liked }) => {
        return (
          <SongItem
            imgSrc={albumCover}
            name={name}
            artist={artist}
            explicit={explicit}
            liked={liked}
            variant="search"
          />
        );
      })}
    </ul>
  );
};
