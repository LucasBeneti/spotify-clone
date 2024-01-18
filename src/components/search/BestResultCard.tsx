import { Link } from "react-router-dom";
import { BigPlayButton } from "../reusable/BigPlayButton";
type ArtistCardProps = {
  name: string;
  authorName?: string;
  imgSrc: string;
};
export const BestResultCard = ({
  name,
  authorName,
  imgSrc,
}: ArtistCardProps) => {
  return (
    <div className="bg-highlight p-5 flex flex-col gap-y-3 w-96 rounded-lg hover:bg-elevated transition-colors delay-100 relative group/item">
      <img src={imgSrc} alt={`${name} image`} className="w-24 rounded-full" />
      <h2 className="text-3xl font-black">{name}</h2>
      <section className="flex gap-x-4 items-center">
        {authorName && (
          <Link to={`/artist/${authorName}`}>
            <p className="text-white text-sm hover:underline hover:text-white">
              {authorName}
            </p>
          </Link>
        )}
        <p className="font-bold text-xs bg-black rounded-full px-2 py-1">
          Song
        </p>
      </section>
      <span className="absolute right-4 bottom-4 transition-opacity opacity-0 group-hover/item:opacity-100">
        <BigPlayButton
          onClickHandle={() => console.log("play this content best choice")}
        />
      </span>
    </div>
  );
};
