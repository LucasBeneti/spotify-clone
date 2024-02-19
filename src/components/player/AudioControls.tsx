import { Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";

export const AudioControls = () => {
  const { isPlaying, toNextTrack, toPreviousTrack, toggleIsPlaying } =
    useCustomAudioContext();

  return (
    <div className="flex gap-x-6 justify-center align-center">
      <button
        className="p-2"
        onClick={toPreviousTrack}
        aria-label="go to previous song"
      >
        <SkipBack size={24} weight="fill" color="white" />
      </button>
      <button
        onClick={toggleIsPlaying}
        className="p-2 rounded-full h-8 bg-white self-center hover:scale-105 transition"
        aria-label="play/pause song"
      >
        {isPlaying ? (
          <Pause size={16} weight="fill" color="black" />
        ) : (
          <Play size={16} weight="fill" color="black" />
        )}
      </button>
      <button
        className="p-2"
        onClick={toNextTrack}
        aria-label="go to next song"
      >
        <SkipForward size={24} weight="fill" color="white" />
      </button>
    </div>
  );
};
