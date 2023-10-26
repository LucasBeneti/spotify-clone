import { useState } from "react";
import { Heart } from "@phosphor-icons/react";

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
  liked = false,
}: {
  imgSrc: string;
  name: string;
  artist: string;
  explicit?: boolean;
  liked?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  return (
    <li className="flex hover:bg-highlight justify-between transition-all">
      <span className="flex gap-x-2 items-center">
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
      </span>
      <span className="flex items-center px-2">
        <button onClick={() => setIsLiked(!isLiked)}>
          <Heart fill="#1ed760" size={24} weight={isLiked ? "fill" : "bold"} />
        </button>
      </span>
    </li>
  );
};
