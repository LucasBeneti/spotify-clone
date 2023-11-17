// TODO type correctly this state and action
export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.data,
        isPlaying: true,
      };
    case "SET_TRACKS":
      return {
        ...state,
        tracks: action.data,
      };
    case "SET_TRACK_INDEX":
      return {
        ...state,
        trackIndex: action.data,
      };
    case "SET_TRACK_PROGRESS":
      return {
        ...state,
        trackProgress: action.data,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.data,
      };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.data,
      };
    case "SET_AUDIO_REF":
      return {
        ...state,
        audioRef: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
