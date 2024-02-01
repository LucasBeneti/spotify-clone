import * as Slider from "@radix-ui/react-slider";
import { Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";
import { getSongDurationInMinutes } from "@utils/songs";

export const AudioPlayer = () => {
  const { duration, trackProgress, onScrub } = useCustomAudioContext();
  const maxDuration = getSongDurationInMinutes(Math.floor(duration));
  const currTime = Math.floor(trackProgress) || 0;
  return (
    <div className="flex flex-col">
      <AudioControls />
      <div className="w-full flex items-center gap-x-2 text-sm">
        <p>{getSongDurationInMinutes(currTime)}</p>
        <Slider.Root
          value={[trackProgress]}
          onValueChange={onScrub}
          step={1}
          min={0}
          max={duration}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-subdued relative flex-1 rounded-full h-1">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            aria-label="Volume"
            className="block bg-white shadow-md rounded-lg"
          />
        </Slider.Root>
        <p>{maxDuration}</p>
      </div>
    </div>
  );
};

const AudioControls = () => {
  const { isPlaying, toNextTrack, toPreviousTrack, toggleIsPlaying } =
    useCustomAudioContext();

  return (
    <div className="flex gap-x-6 justify-center align-center">
      <button className="p-2" onClick={toPreviousTrack}>
        <SkipBack size={24} weight="fill" color="white" />
      </button>
      <button
        onClick={toggleIsPlaying}
        className="p-2 rounded-full h-8 bg-white self-center hover:scale-105 transition"
      >
        {isPlaying ? (
          <Pause size={16} weight="fill" color="black" />
        ) : (
          <Play size={16} weight="fill" color="black" />
        )}
      </button>
      <button className="p-2" onClick={toNextTrack}>
        <SkipForward size={24} weight="fill" color="white" />
      </button>
    </div>
  );
};
