import { createContext, useState, useEffect, useContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { getUserPlaylists } from "../services/playlistServices";
import { useCookies } from "react-cookie";

export type Playlist = {
  playlist_id: number;
  cover_src?: string;
  name: string;
  id: number;
  author_username?: string;
  author?: string;
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
  const [cookies, setCookies] = useCookies(["user_jwt"]);
  const { user } = useUser(); // username nao esta definido quando renderiza o componente (tenho que entender melhor isso)
  const { getToken } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[] | []>([]);
  const username = user?.username ? user.username : "random123";

  const getUserToken = async () => {
    const token = await getToken({
      template: "spotify-clone-template", // TODO passar para env variables
    });

    return token;
  };

  const initState = async () => {
    if (!cookies.user_jwt) {
      const token = await getToken({ template: "spotify-clone-template" });
      setCookies("user_jwt", token, { path: "/" });
    }
    initUserPlaylists();
  };

  const initUserPlaylists = async () => {
    try {
      const userToken = cookies.user_jwt;

      if (!userToken) {
        console.error("No token available for this user.");
        return;
      }
      const { userPlaylists } = await getUserPlaylists(userToken);
      const typedPlaylists = userPlaylists.map((playlistData: Playlist) => {
        // TODO rever se estou errando em algo aqui
        const playlistAuthor =
          user?.username === playlistData.author_username
            ? "Eu"
            : playlistData.author_username;
        return { ...playlistData, type: "playlist", author: playlistAuthor };
      });
      console.log("usersPlaylist", typedPlaylists);
      console.log("username", user?.username);
      setPlaylists([...typedPlaylists]);
    } catch (error) {
      console.error(error);
    }
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
