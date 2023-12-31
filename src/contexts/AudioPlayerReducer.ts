export type Song = {
  id: number;
  name: string;
  album_id?: number;
  album_name?: string;
  author_id: string;
  artist_name: string; // artist_name
  cover_art?: string;
  position_on_album?: string;
  source_link: string;
  times_played?: number;
  duration?: number;
};

export type Album = {
  id: string | number;
  name: string;
  launch_year: string;
  cover_art: string;
};

export type PlayerState = {
  currentlyPlaying: Song | null;
  tracks: Song[];
  trackIndex: number;
  trackProgress: number;
  isPlaying: boolean;
  volume: number[];
};

type AudioPlayerReducerActionsType =
  | "SET_TRACKS"
  | "SET_TRACK_INDEX"
  | "SET_TRACK_PROGRESS"
  | "SET_IS_PLAYING"
  | "SET_VOLUME"
  | "SET_CURRENTLY_PLAYING";

type AutioPlayerReducerAction = {
  data: any;
  type: AudioPlayerReducerActionsType;
};

const SET_CURRENTLY_PLAYING = "SET_CURRENTLY_PLAYING";
const SET_TRACKS = "SET_TRACKS";
const SET_TRACK_INDEX = "SET_TRACK_INDEX";
const SET_TRACK_PROGRESS = "SET_TRACK_PROGRESS";
const SET_IS_PLAYING = "SET_IS_PLAYING";
const SET_VOLUME = "SET_VOLUME";

export const audioPlayerReducer = (
  state: PlayerState,
  action: AutioPlayerReducerAction,
): PlayerState => {
  switch (action.type) {
    case SET_CURRENTLY_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.data,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.data,
      };
    case SET_TRACK_INDEX:
      return {
        ...state,
        trackIndex: action.data,
      };
    case SET_TRACK_PROGRESS:
      return {
        ...state,
        trackProgress: action.data,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.data,
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
