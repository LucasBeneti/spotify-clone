import {
  createContext,
  useRef,
  useEffect,
  useContext,
  useReducer,
} from "react";

import {
  audioPlayerReducer,
  PlayerState,
  Song,
} from "../contexts/AudioPlayerReducer";

const testTracks = [
  {
    name: "Tokyo Lo-fi 1",
    author_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 2",
    author_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 3",
    author_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 4",
    author_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
];

type CustomAudioContextProps = {
  tracks: Song[];
  duration: number;
  isPlaying: boolean;
  trackProgress: number;
  toggleIsPlaying: () => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
  currPlaying?: { name: string; author_name: string };
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
  const initialAudioPlayerState: PlayerState = {
    isPlaying: false,
    tracks: [],
    trackIndex: -1,
    volume: [-1],
    trackProgress: -1,
  };
  const [state, dispatch] = useReducer(
    audioPlayerReducer,
    initialAudioPlayerState,
  );

  // const [tracks, setTrack] = useState(testTracks); // TODO used for adding/removing tracks to the queue
  // const [trackIndex, setTrackIndex] = useState(0);
  // const [trackProgress, setTrackProgress] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState<number[]>([0]);

  // const { source_link, name, author_name } = state.tracks[state.trackIndex];
  const currPlaying = state.tracks[state.trackIndex];
  const audioRef = useRef(new Audio(currPlaying?.source_link));

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toggleIsPlaying = () => {
    dispatch({ type: "SET_IS_PLAYING", data: !state.isPlaying });
    // setIsPlaying(!isPlaying);
  };

  const toPreviousTrack = () => {
    if (state.trackIndex - 1 < 0) {
      dispatch({ type: "SET_TRACK_INDEX", data: state.tracks.length - 1 });
      // setTrackIndex(tracks.length - 1);
    } else {
      dispatch({ type: "SET_TRACK_INDEX", data: state.trackIndex - 1 });
      // setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (state.trackIndex < state.tracks.length - 1) {
      dispatch({ type: "SET_TRACK_INDEX", data: state.trackIndex + 1 });
      // setTrackIndex(trackIndex + 1);
    } else {
      dispatch({ type: "SET_TRACK_INDEX", data: 0 });
      // setTrackIndex(0);
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        dispatch({
          type: "SET_TRACK_PROGRESS",
          data: audioRef.current.currentTime,
        });
        // setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number[]) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value[0]);
    dispatch({
      type: "SET_TRACK_PROGRESS",
      data: audioRef.current.currentTime,
    });
    // setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!state.isPlaying) {
      dispatch({ type: "SET_IS_PLAYING", data: true });
      // setIsPlaying(true);
    }
    startTimer();
  };

  const handleVolumeChange = (value: number[]) => {
    dispatch({ type: "SET_VOLUME", data: value });
    // setVolume(value);
    audioRef.current.volume = value[0] > 1 ? value[0] / 100 : value[0];
  };

  const toggleAudioMute = () => {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = state.volume[0] / 100;
      // TODO need to figure out how to set the volume to previous value
      // to the value that it was right before muting
      /* One idea is to save the volume on localStorage when muting, this way we can 
          recover it further on */
    } else {
      audioRef.current.volume = 0;
      dispatch({ type: "SET_VOLUME", data: [0] });
    }
  };

  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    dispatch({ type: "SET_TRACKS", data: testTracks });
    // setTrack(testTracks);
    const currAudioRef = audioRef.current;
    const currIntervalRef = intervalRef.current;
    return () => {
      currAudioRef.pause();
      clearInterval(currIntervalRef);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(currPlaying?.source_link);
    dispatch({
      type: "SET_TRACK_PROGRESS",
      data: audioRef.current.currentTime,
    });
    // setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.volume = 0.2; // TODO refactor to serve a better logic for UX
      audioRef.current.play();
      dispatch({ type: "SET_IS_PLAYING", data: true });
      // setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [state.trackIndex]);

  return (
    <CustomAudioContext.Provider
      value={{
        tracks: state.tracks,
        duration,
        isPlaying: state.isPlaying,
        trackProgress: state.trackProgress,
        toNextTrack,
        toPreviousTrack,
        toggleIsPlaying,
        currPlaying,
        onScrub,
        onScrubEnd,
        volume: state.volume,
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
