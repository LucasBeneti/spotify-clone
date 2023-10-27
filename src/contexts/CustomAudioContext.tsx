import { createContext, useRef, useState, useEffect, useContext } from "react";

const testTracks = [
  {
    title: "Tokyo Lo-fi 1",
    artist: "Unknown",
    color: "purple",
    audioSrc:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    title: "Tokyo Lo-fi 2",
    artist: "Unknown",
    color: "purple",
    audioSrc:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    title: "Tokyo Lo-fi 3",
    artist: "Unknown",
    color: "purple",
    audioSrc:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    title: "Tokyo Lo-fi 4",
    artist: "Unknown",
    color: "purple",
    audioSrc:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
];

type Track = {
  title: string;
  artist: string;
  color: string;
  img?: string;
  audioSrc: string;
};

type CustomAudioContextProps = {
  tracks: Track[];
  duration: number;
  isPlaying: boolean;
  trackProgress: number;
  toggleIsPlaying: () => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
  currPlaying?: { title: string; artist: string };
  onScrub: (n: number[]) => void;
  onScrubEnd: () => void;
  volume: number[];
  handleVolumeChange: (n: number[]) => void;
  toggleAudioMute: () => void;
};

export const CustomAudioContext = createContext<CustomAudioContextProps | null>(
  null,
);

interface AudioContextProviderProps {
  children: React.ReactNode;
}
export const AudioContextProvider = ({
  children,
}: AudioContextProviderProps) => {
  const [tracks, setTrack] = useState(testTracks); // TODO used for adding/removing tracks to the queue
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number[]>([0]);

  const { audioSrc, title, artist } = tracks[trackIndex];
  const currPlaying = { title, artist };
  const audioRef = useRef(new Audio(audioSrc));

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const toPreviousTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number[]) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value[0]);
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    audioRef.current.volume = value[0] > 1 ? value[0] / 100 : value[0];
  };

  const toggleAudioMute = () => {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = volume[0] / 100;
      // TODO need to figure out how to set the volume to previous value
      // to the value that it was right before muting
      /* One idea is to save the volume on localStorage when muting, this way we can 
            recover it further on */
    } else {
      audioRef.current.volume = 0;
      setVolume([0]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setTrack(testTracks);
    const currAudioRef = audioRef.current;
    const currIntervalRef = intervalRef.current;
    return () => {
      currAudioRef.pause();
      clearInterval(currIntervalRef);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.volume = 0.2; // TODO refactor to serve a better logic for UX
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, audioSrc]);

  return (
    <CustomAudioContext.Provider
      value={{
        tracks,
        duration,
        isPlaying,
        trackProgress,
        toNextTrack,
        toPreviousTrack,
        toggleIsPlaying,
        currPlaying,
        onScrub,
        onScrubEnd,
        volume,
        handleVolumeChange,
        toggleAudioMute,
      }}
    >
      {children}
    </CustomAudioContext.Provider>
  );
};

export const useCustomAudioContext = () => {
  const context = useContext(CustomAudioContext);
  if (!context) {
    throw new Error(
      "useCustomAudioContext must be used within AudioContextProvider.",
    );
  }

  return context;
};
