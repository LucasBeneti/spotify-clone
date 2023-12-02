import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "@phosphor-icons/react";

type SongItemProps = {
  imgSrc: string;
  name: string;
  artist: {
    id: string;
    name: string;
  };
  explicit?: boolean;
  liked?: boolean;
  variant?: string;
};

export const SongItem = ({
  imgSrc,
  name,
  artist,
  explicit = false,
  liked = false,
  variant = "default",
}: SongItemProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const isPlaylistVariant = variant === "playlist";
  const isSearchVariant = variant === "search";

  return (
    <li className="flex hover:bg-highlight justify-between transition-all">
      <span className="flex gap-x-2 items-center">
        <img
          src={imgSrc}
          alt="An album cover"
          className={isPlaylistVariant ? "w-8" : "w-12"}
        />
        <span className="flex flex-col">
          <p className="text-white text-sm">{name}</p>
          <span className="flex gap-x-1 items-center">
            {explicit && (
              <span className="flex justify-center px-1 leading-4 bg-subdued rounded-sm text-black uppercase text-xs">
                E
              </span>
            )}
            {isPlaylistVariant || isSearchVariant ? (
              <Link to={`/artist/${artist.id}`}>
                <p className="text-subdued text-sm hover:underline hover:text-white">
                  {artist.name}
                </p>
              </Link>
            ) : null}
          </span>
        </span>
      </span>
      {isSearchVariant ? (
        <span className="flex items-center px-2">
          <button onClick={() => setIsLiked(!isLiked)}>
            <Heart
              fill="#1ed760"
              size={24}
              weight={isLiked ? "fill" : "bold"}
            />
          </button>
        </span>
      ) : null}
    </li>
  );
};
