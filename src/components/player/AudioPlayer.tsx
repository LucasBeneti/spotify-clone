import * as Slider from "@radix-ui/react-slider";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";
import { getSongDurationInMinutes } from "@utils/songs";

import { AudioControls } from "@components/player";

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
            aria-label="song progress bar"
            className="block bg-white shadow-md rounded-lg"
          />
        </Slider.Root>
        <p>{maxDuration}</p>
      </div>
    </div>
  );
};
