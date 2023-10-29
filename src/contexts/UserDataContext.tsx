import { createContext, useRef, useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserPlaylists } from "../services/playlistServices";

type Playlist = {
  name: string;
  cover_src: string;
  author: string;
  liked?: boolean;
  songs: {
    name: string;
    artist: string;
    album: string;
    date_added: Date;
    duration: number;
  }[];
};

type UserDataContext = {
  playlists?: Playlist[];
  username: string;
};

export const UserDataContext = createContext<UserDataContext>({ username: "" });
interface UserDataContextProps {
  children: React.ReactNode;
}

export const UserDataContextProvider = ({ children }: UserDataContextProps) => {
  const { user } = useUser();
  const username = user?.username ? user.username : "random123";

  const playlists = async () => {
    try {
      const usersPlaylist = await getUserPlaylists(username);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserDataContext.Provider
      value={{
        playlists,
        username,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
