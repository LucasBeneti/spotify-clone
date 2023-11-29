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
  artist?: string;
};

export const SongList = ({ songs, artist }: SongListProps) => {
  console.log(songs);
  return (
    <ul className="flex flex-1 flex-col gap-y-2">
      {songs.map(
        ({ name, albumCoverArt, explicit, liked, authorName }, index) => {
          return (
            <SongItem
              imgSrc={albumCoverArt}
              name={name}
              artist={artist ? artist : authorName}
              explicit={explicit}
              liked={liked}
              variant="search"
              key={`${name}_${index}`}
            />
          );
        },
      )}
    </ul>
  );
};
