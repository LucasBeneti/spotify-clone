import { memo } from "react";
import { Link } from "react-router-dom";
type CurrentlyPlayingProps = {
  title?: string;
  artist?: string;
  album?: string;
  artistId?: string | number;
  songCoverArt?: string;
};

export const CurrentlyPlaying = memo(
  ({
    title,
    artist,
    artistId,
    songCoverArt = "https://i.scdn.co/image/ab67616d0000b273585f3d70dce678a5978a0941",
  }: CurrentlyPlayingProps) => {
    return (
      <div className="flex gap-x-4 items-center">
        <img
          src={songCoverArt}
          alt="Album"
          className="object-cover w-14 rounded-md"
        />
        <div>
          <a
            href="#"
            className="text-sm block hover:underline hover:cursor-pointer"
          >
            {title ? title : ""}
          </a>
          <Link
            to={`/artist/${artistId}`}
            className="text-xs block text-subdued hover:underline hover cursor-pointer"
          >
            {artist ? artist : ""}
          </Link>
        </div>
      </div>
    );
  },
);
