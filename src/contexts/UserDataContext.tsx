import { createContext, useState, useEffect, useContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { getUserPlaylists } from "../services/playlistServices";

export type Playlist = {
  playlist_id: number;
  cover_src?: string;
  name: string;
  id: number;
  author_username: string;
  type?: string;
};

type UserDataContext = {
  playlists?: Playlist[] | undefined;
  username: string;
};

export const UserDataContext = createContext<UserDataContext>({ username: "" });
interface UserDataContextProps {
  children: React.ReactNode;
}

export const UserDataContextProvider = ({ children }: UserDataContextProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[] | []>([]);
  const username = user?.username ? user.username : "random123";

  const initUserPlaylists = async () => {
    try {
      const token = await getToken({
        template: "spotify-clone-template", // TODO passar para env variables
      });

      if (!token) {
        console.error("No token available for this user.");
        return;
      }
      const { userPlaylists } = await getUserPlaylists(token);
      console.log("usersPlaylist", userPlaylists);
      setPlaylists([...userPlaylists]);
    } catch (error) {
      console.error(error);
    }
  };

  const initState = () => {
    initUserPlaylists();
  };

  useEffect(() => {
    initState();
  }, []);

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

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "useUserDataContext must be used within UserDataContextProvider.",
    );
  }

  return context;
};
