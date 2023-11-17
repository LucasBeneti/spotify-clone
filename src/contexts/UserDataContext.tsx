import { createContext, useRef, useState, useEffect, useContext } from "react";
import { useUser, useSession } from "@clerk/clerk-react";
import { getUserPlaylists, Playlist } from "../services/playlistServices";

type UserDataContext = {
  playlists?: Promise<Playlist[] | undefined> | undefined;
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
      return usersPlaylist;
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
