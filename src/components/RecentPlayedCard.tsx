import { useState } from "react";
import { Play, Pause } from "@phosphor-icons/react";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";
type RecentPlayedCardProps = {
  name: string;
  imgSrc: string;
};
export const RecentPlayedCard = ({ name, imgSrc }: RecentPlayedCardProps) => {
  const { isPlaying, setCurrentSong, tracks } = useCustomAudioContext();
  const [playing, setPlaying] = useState<boolean>(true);
  const handlePlayingToggle = () => {
    setCurrentSong(tracks[0]);
    setPlaying(!playing);
  };
  return (
    <div className="flex justify-between rounded-lg bg-highlight w-[30%] h-20">
      <div className="flex gap-x-4 items-center">
        <img className="w-20 h-20 object-cover" src={imgSrc} alt="" />
        <h2 className="text-2xl font-bold">{name}</h2>
      </div>
      {/* {isPlaying ? ( */}
      <button
        onClick={handlePlayingToggle}
        className="self-center justify-end bg-primary p-2 mr-4 rounded-full transition hover:scale-105"
      >
        {isPlaying ? (
          <Pause size={24} weight="fill" fill="black" />
        ) : (
          <Play size={24} weight="fill" fill="black" />
        )}
      </button>
      {/* ) : null} */}
    </div>
  );
};
