type SongListProps = {
  songs: {
    name: string;
    albumCover: string;
    explicit?: boolean;
  }[];
  artist: string;
};
export const SongList = ({ songs, artist }: SongListProps) => {
  console.log(songs);
  return (
    <ul className="flex flex-col gap-y-2">
      {songs.map(({ name, albumCover, explicit }) => {
        return (
          <SongItem
            imgSrc={albumCover}
            name={name}
            artist={artist}
            explicit={explicit}
          />
        );
      })}
    </ul>
  );
};

const SongItem = ({
  imgSrc,
  name,
  artist,
  explicit = false,
}: {
  imgSrc: string;
  name: string;
  artist: string;
  explicit?: boolean;
}) => {
  return (
    <li className="flex gap-x-2">
      <img src={imgSrc} alt="An album cover" className="w-12" />
      <span className="flex flex-col">
        <p className="text-white text-sm">{name}</p>
        <span className="flex gap-x-1 items-center">
          {explicit && (
            <span className="flex justify-center px-1 leading-4 bg-subdued rounded-sm text-black uppercase text-xs">
              E
            </span>
          )}
          <p className="text-subdued text-sm">{artist}</p>
        </span>
      </span>
    </li>
  );
};
