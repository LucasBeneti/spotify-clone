import type { Playlist } from "../services/playlistServices";

type UserBasicInfo = {
  username: string;
  token: string;
};
type PlaylistsState = Playlist[] | [];

type UserStateType = {
  userinfo: UserBasicInfo;
  playlists: PlaylistsState;
  isPlaylistsLoading: boolean;
};

export const initialUserState: UserStateType = {
  userinfo: {
    username: "",
    token: "",
  },
  playlists: [],
  isPlaylistsLoading: true,
};

type UserActionsTypes = {
  type: "SET_USERNAME" | "SET_TOKEN" | "SET_PLAYLISTS";
  data: any;
};

const SET_USERNAME = "SET_USERNAME";
const SET_TOKEN = "SET_TOKEN";
const SET_PLAYLISTS = "SET_PLAYLISTS";

export const userReducer = (state: UserStateType, action: UserActionsTypes) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userinfo: { ...state.userinfo, username: action.data },
      };
    case SET_TOKEN:
      return {
        ...state,
        userinfo: { ...state.userinfo, token: action.data },
      };
    case SET_PLAYLISTS:
      const validData = action.data satisfies Playlist;
      if (!validData) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        playlists: action.data,
      };
  }
};
