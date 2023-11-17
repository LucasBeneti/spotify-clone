import { useRef, useState, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";

type AudioPlayerProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
};

export const AudioPlayer = ({ audioRef }: AudioPlayerProps) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const { toNextTrack, isPlaying, currentSong } = useCustomAudioContext();

  const intervalRef = useRef<NodeJS.Timeout>();
  // no primeiro load do componente o startTimer não é chamado, por isso que a barra
  // de progresso não roda sozinha, somente depois do primeiro scrub que o usuário tenta
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.ended) {
          toNextTrack();
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }
    }, 1000);
  };

  const onScrub = (value: number[]) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value[0]);
  };

  const onScrubEnd = () => {
    startTimer();
  };

  useEffect(() => {
    const currAudioRef = audioRef.current;
    const currIntervalRef = intervalRef.current;
    return () => {
      currAudioRef.pause();
      clearInterval(currIntervalRef);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log(currentSong);
    audioRef.current.pause();
    if (currentSong?.audioSrc) {
      console.log("mudou em teoria");
      audioRef.current = new Audio(currentSong?.audioSrc);
      setTrackProgress(audioRef.current.currentTime);

      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      }
    }
  }, [currentSong]);

  return (
    <div className="flex flex-col">
      <AudioControls />
      <div className="w-full">
        <Slider.Root
          value={[trackProgress]}
          onValueChange={onScrub}
          step={1}
          min={0}
          max={audioRef?.current ? audioRef.current.duration : 0}
          onPointerUp={onScrubEnd}
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
