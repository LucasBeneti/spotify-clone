import { createContext, useContext, useReducer } from "react";
import AudioContextReducer from "./AudioContextReducer";

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
  trackIndex: number;
  isPlaying: boolean;
  trackProgress: number;
  toggleIsPlaying: () => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
  currentSong?: Track;
  setCurrentSong: (data: Track) => void;
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
  const initialState = {
    tracks: testTracks,
    trackIndex: 0,
    trackProgress: 0,
    isPlaying: false,
    volume: [0],
    currentSong: testTracks[0],
  };

  const [state, dispatch] = useReducer(AudioContextReducer, initialState);

  const toggleIsPlaying = () => {
    // const isAudioPaused =audioRef.current.paused;
    // TODO aqui está o problema, não tem source e o current existe em teoria
    if (state.currentSong.audioSrc) {
      dispatch({
        type: "SET_IS_PLAYING",
        data: !state.isPlaying,
      });
    } else {
      console.log("audioref does not have a source");
    }
  };

  const setCurrentSong = (songData: Track) => {
    console.log("setting this one now: ", songData);
    dispatch({ type: "SET_CURRENT_SONG", data: songData });
  };

  const toPreviousTrack = () => {
    console.log("toPreviousTrack called");
    let newTrackIndex;
    if (state.trackIndex - 1 < 0) {
      newTrackIndex = state.tracks.length - 1;
      dispatch({ type: "SET_TRACK_INDEX", data: newTrackIndex });
    } else {
      newTrackIndex = state.trackIndex - 1;
      dispatch({ type: "SET_TRACK_INDEX", data: newTrackIndex });
    }
    setCurrentSong(state.tracks[newTrackIndex]);
  };

  const toNextTrack = () => {
    console.log("toNextTrack called");
    let newTrackIndex;
    if (state.trackIndex < state.tracks.length - 1) {
      newTrackIndex = state.trackIndex + 1;
      dispatch({ type: "SET_TRACK_INDEX", data: newTrackIndex });
    } else {
      // TODO implementar algo pra lidar com o fim da lista
      // quando acabar as tracks, o que devemos fazer?
      // no momento esta num loop infinito
      newTrackIndex = 0;
      dispatch({ type: "SET_TRACK_INDEX", data: newTrackIndex });
    }
    setCurrentSong(state.tracks[newTrackIndex]);
  };

  return (
    <CustomAudioContext.Provider
      value={{
        tracks: state.tracks,
        trackIndex: state.trackIndex,
        trackProgress: state.trackProgress,
        isPlaying: state.isPlaying,
        currentSong: state.currentSong,
        setCurrentSong,
        toNextTrack,
        toPreviousTrack,
        toggleIsPlaying,
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
