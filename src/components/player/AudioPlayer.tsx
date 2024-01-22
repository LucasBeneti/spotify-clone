import * as Slider from "@radix-ui/react-slider";
import { Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react";
import { useCustomAudioContext } from "../../contexts/CustomAudioContext";

export const AudioPlayer = () => {
  const { duration, trackProgress, onScrub } = useCustomAudioContext();

  return (
    <div className="flex flex-col">
      <AudioControls />
      <div className="w-full">
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
      </div>
    </div>
  );
};

const AudioControls = () => {
  const { isPlaying, toNextTrack, toPreviousTrack, toggleIsPlaying } =
    useCustomAudioContext();

  return (
    <div className="flex gap-x-6 justify-center">
      <button className="p-2" onClick={toPreviousTrack}>
        <SkipBack size={24} weight="fill" color="white" />
      </button>
      <button className="p-2">
        {isPlaying ? (
          <Pause
            size={24}
            weight="fill"
            color="white"
            onClick={toggleIsPlaying}
          />
        ) : (
          <Play
            size={24}
            weight="fill"
            color="white"
            onClick={toggleIsPlaying}
          />
        )}
      </button>
      <button className="p-2" onClick={toNextTrack}>
        <SkipForward size={24} weight="fill" color="white" />
      </button>
    </div>
  );
};
