import { createContext, useRef, useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserPlaylists, Playlist } from "../services/playlistServices";

type TempPlaylist = {
  playlist_id: number;
  cover_src?: string;
  name: string;
  author: string;
};

type UserDataContext = {
  playlists?: TempPlaylist[] | undefined;
  username: string;
};

export const UserDataContext = createContext<UserDataContext>({ username: "" });
interface UserDataContextProps {
  children: React.ReactNode;
}

export const UserDataContextProvider = ({ children }: UserDataContextProps) => {
  const { user } = useUser();
  const [playlists, setPlaylists] = useState<TempPlaylist[] | []>([]);
  const username = user?.username ? user.username : "random123";

  const getUsersPlaylist = () => {
    try {
      const usersPlaylist = getUserPlaylists(username);
      return usersPlaylist || [];
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
