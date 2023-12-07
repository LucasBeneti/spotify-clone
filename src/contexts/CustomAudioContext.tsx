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

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toggleIsPlaying = () => {
    dispatch({ type: "SET_IS_PLAYING", data: !state.isPlaying });
  };

  const addTrackToQueue = (song: Song) => {
    const currTracks = state.tracks;
    currTracks.push(song);
    dispatch({ type: "SET_TRACKS", data: currTracks });
  };

  // TODO check why we're not reacting to the play now feature. Probably should create a method
  // to check if we should change the current audioRef src and some other things like the track index
  // and maybe also the progress (this could be done in a separate function, to reset all this states)
  const playSongNow = (song: Song) => {
    const currTracks = state.tracks;
    currTracks.unshift(song);
    dispatch({ type: "SET_TRACKS", data: currTracks });
    dispatch({ type: "SET_TRACK_INDEX", data: 0 });
    dispatch({ type: "SET_CURRENTLY_PLAYING", data: song });
    audioRef.current.pause();
    audioRef.current = new Audio(song?.source_link);
    // audioRef.current.src = song?.source_link; // mudando a source pro mais atual (em teoria)
    // setar o progress pro inicio
    dispatch({ type: "SET_TRACK_PROGRESS", data: 0 });
    // await resetAudioPlaying(); // reseta o o audio ref
    dispatch({ type: "SET_IS_PLAYING", data: true });
    // startTimer();
  };

  const resetAudioPlaying = async () => {
    console.log(
      "reset audio ref - currently playing: ",
      state.currentlyPlaying,
    );
    audioRef.current.src = state.currentlyPlaying!.source_link; // mudando a source pro mais atual (em teoria)
    // setar o progress pro inicio
    dispatch({ type: "SET_TRACK_PROGRESS", data: 0 });
    // checar o isPLaying pra ver se continua no play ou não\
    // dispatch({ type: "SET_IS_PLAYING", data: true });
    // dependendo do resultado do isPLaying, damos o start ou não
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

  // TODO check a way to pause the timer also
  // does not make sense to have it running while the audio is paused
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      console.log("starttimer running");
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
  };

  const onScrubEnd = () => {
    if (!state.isPlaying) {
      dispatch({ type: "SET_IS_PLAYING", data: true });
    }
    startTimer();
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

  // TODO revisit this useeffect and check if there's anything to improve around it
  // useEffect(() => {
  //   console.log("third useeffect");
  //   // audioRef.current.pause();

  //   // audioRef.current = new Audio(state.currentlyPlaying?.source_link);
  //   dispatch({
  //     type: "SET_TRACK_PROGRESS",
  //     data: audioRef.current.currentTime,
  //   });
  //   // setTrackProgress(audioRef.current.currentTime);
  //   if (isReady.current) {
  //     console.log("sempre chamado");
  //     audioRef.current.volume = 0.2; // TODO refactor to serve a better logic for UX
  //     audioRef.current.play();
  //     dispatch({ type: "SET_IS_PLAYING", data: true });
  //     // setIsPlaying(true);
  //     startTimer();
  //   } else {
  //     isReady.current = true;
  //   }
  // }, [state.trackIndex, state.currentlyPlaying?.id]);

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
