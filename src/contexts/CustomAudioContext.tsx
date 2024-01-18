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
} from "@contexts/AudioPlayerReducer";

const testTracks = [
  {
    name: "Tokyo Lo-fi 1",
    artist_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 2",
    artist_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 3",
    artist_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
  {
    name: "Tokyo Lo-fi 4",
    artist_name: "Unknown",
    color: "purple",
    source_link:
      "https://utfs.io/f/8d860e35-4ae3-4d7a-a98e-2a5db3692b21-no9q48.mp3",
  },
];

type CustomAudioContextProps = {
  tracks: Song[];
  audioElementRef: React.MutableRefObject<HTMLAudioElement>;
  duration: number;
  isPlaying: boolean;
  trackProgress: number;
  toggleIsPlaying: () => void;
  addTrackToQueue: (s: Song) => void;
  playSongNow: (s: Song) => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
  currentlyPlaying?: Song | null;
  onScrub: (n: number[]) => void;
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
    currentlyPlaying: null,
    isPlaying: false,
    tracks: [],
    trackIndex: -1,
    volume: [-1],
    trackProgress: 0,
  };
  const [state, dispatch] = useReducer(
    audioPlayerReducer,
    initialAudioPlayerState,
  );

  const audioRef = useRef(new Audio(state?.currentlyPlaying?.source_link));

  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const { duration } = audioRef.current;

  const toggleIsPlaying = () => {
    dispatch({ type: "SET_IS_PLAYING", data: !state.isPlaying });
  };

  const addTrackToQueue = (song: Song) => {
    const currTracks = state.tracks;
    currTracks.push(song);
    dispatch({ type: "SET_TRACKS", data: currTracks });
    console.log("song queue: ", currTracks);
  };

  const playSongNow = (song: Song) => {
    const currTracks = state.tracks;
    currTracks.unshift(song);
    dispatch({ type: "SET_TRACKS", data: currTracks });
    dispatch({ type: "SET_TRACK_INDEX", data: 0 });
    dispatch({ type: "SET_CURRENTLY_PLAYING", data: song });

    dispatch({ type: "SET_TRACK_PROGRESS", data: 0 });
    dispatch({ type: "SET_IS_PLAYING", data: true });
    setNewSongToAudioRef(song);
  };

  const setNewSongToAudioRef = (song: Song) => {
    audioRef.current.pause();
    audioRef.current = new Audio(song.source_link);

    if (state.isPlaying) {
      audioRef.current.play();
      startTimer();
      dispatch({ type: "SET_IS_PLAYING", data: true });
    }

    dispatch({ type: "SET_CURRENTLY_PLAYING", data: song });
  };

  const toNextTrack = () => {
    let newTrackIndex = 0;
    if (state.trackIndex < state.tracks.length - 1) {
      newTrackIndex = state.trackIndex + 1;
      dispatch({ type: "SET_TRACK_INDEX", data: state.trackIndex + 1 });
    } else {
      dispatch({ type: "SET_TRACK_INDEX", data: 0 });
    }

    const nextSong = state.tracks[newTrackIndex];
    setNewSongToAudioRef(nextSong);
  };

  const toPreviousTrack = () => {
    let newTrackIndex = 0;
    if (state.trackIndex - 1 < 0) {
      newTrackIndex = state.tracks.length - 1;
      dispatch({ type: "SET_TRACK_INDEX", data: state.tracks.length - 1 });
    } else {
      newTrackIndex = state.trackIndex - 1;
      dispatch({ type: "SET_TRACK_INDEX", data: state.trackIndex - 1 });
    }

    const nextSong = state.tracks[newTrackIndex];
    setNewSongToAudioRef(nextSong);
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    const timeout: ReturnType<typeof setTimeout> = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        dispatch({
          type: "SET_TRACK_PROGRESS",
          data: audioRef.current.currentTime,
        });
      }
    }, 1000);
    intervalRef.current = timeout;
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const onScrub = (value: number[]) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value[0]);
    dispatch({
      type: "SET_TRACK_PROGRESS",
      data: audioRef.current.currentTime,
    });

    if (state.isPlaying) {
      dispatch({ type: "SET_IS_PLAYING", data: true });
      startTimer();
    } else {
      dispatch({ type: "SET_IS_PLAYING", data: false });
      stopTimer();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    dispatch({ type: "SET_VOLUME", data: value });
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
      stopTimer();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    dispatch({ type: "SET_TRACKS", data: testTracks });
    const currAudioRef = audioRef.current;
    const currIntervalRef = intervalRef.current;
    return () => {
      currAudioRef.pause();
      clearInterval(currIntervalRef);
    };
  }, []);

  return (
    <CustomAudioContext.Provider
      value={{
        tracks: state.tracks,
        audioElementRef: audioRef,
        duration,
        isPlaying: state.isPlaying,
        trackProgress: state.trackProgress,
        toNextTrack,
        toPreviousTrack,
        toggleIsPlaying,
        addTrackToQueue,
        playSongNow,
        currentlyPlaying: state.currentlyPlaying,
        onScrub,
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
