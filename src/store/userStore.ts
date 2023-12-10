import { create, StateCreator } from "zustand";

import type { Playlist } from "../contexts/UserDataContext";

type UserBasicInfo = {
  username: string;
  token: string;
  playlists: Playlist;
};

type UserState = {
  userinfo: UserBasicInfo;
  // initializeStore: (playlists: PlaylistsState, userinfo: UserBasicInfo) => void;
  setUserInfo: ({
    username,
    token,
  }: {
    username: string;
    token: string;
  }) => void;
};

export const useUserStore = create<UserState>()((set) => ({
  userinfo: { username: "", token: "" },
  setUserInfo: (info) =>
    set((state) => ({ userinfo: { ...state.userinfo, ...info } })),
}));
