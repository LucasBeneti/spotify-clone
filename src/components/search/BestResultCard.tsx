import { Link } from "react-router-dom";
import { BigPlayButton } from "@components/reusable";
import type { Song } from "@contexts/AudioPlayerReducer";

type ArtistCardProps = {
  song: Song;
  handlePlaySong: (s: Song) => void;
};

export const BestResultCard = ({ song, handlePlaySong }: ArtistCardProps) => {
  const { cover_art, name, artist_name, author_id } = song;

  const hasAllDataNeeded = cover_art && name && artist_name;
  return (
    <div className="bg-highlight p-5 flex flex-col gap-y-3 w-96 rounded-lg hover:bg-elevated transition-colors delay-100 relative group/item">
      {hasAllDataNeeded ? (
        <>
          <img
            src={cover_art}
            alt={`${name} image`}
            className="w-24 rounded-full"
          />
          <h2 className="text-3xl font-black">{name}</h2>
          <section className="flex gap-x-4 items-center">
            {artist_name && (
              <Link to={`/artist/${author_id}`}>
                <p className="text-white text-sm hover:underline hover:text-white">
                  {artist_name}
                </p>
              </Link>
            )}
            <p className="font-bold text-xs bg-black rounded-full px-2 py-1">
              Song
            </p>
          </section>
          <span className="absolute right-4 bottom-4 transition-opacity opacity-0 group-hover/item:opacity-100">
            <BigPlayButton onClickHandle={() => handlePlaySong(song)} />
          </span>
        </>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};
