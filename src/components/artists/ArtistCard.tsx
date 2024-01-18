import { ReactNode } from "react";

type ArtistCardProps = {
  name: string;
  imgSrc: string;
};

export const ArtistCard = ({ name, imgSrc }: ArtistCardProps): ReactNode => {
  return (
    <div className="bg-highlight p-5 flex flex-col gap-y-3 w-96  rounded-lg">
      <img src={imgSrc} alt={`${name} image`} className="w-24 rounded-full" />
      <h2 className="text-3xl font-black">{name}</h2>
      <p className="font-bold text-sm">Artist</p>
    </div>
  );
};
