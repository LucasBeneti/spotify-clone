import { createContext, useEffect, useContext, useReducer } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { userReducer, initialUserState } from "./UserDataReducer";
import { getCookieExpDate } from "../utils";
import { Playlist } from "../services/playlistServices";
import { getUserPlaylists } from "../services/playlistServices";
import { checkUserExistence } from "../services/userServices";

type UserDataContext = {
  playlists?: Playlist[] | undefined;
  username?: string;
  userToken?: string;
  getUserToken?: () => Promise<string | null>;
  addPlaylistToList?: (p: Playlist | Playlist[]) => void;
};

export const UserDataContext = createContext<UserDataContext>({ username: "" });
interface UserDataContextProps {
  children: React.ReactNode;
}

export const UserDataContextProvider = ({ children }: UserDataContextProps) => {
  const [cookies, setCookies] = useCookies(["user_jwt"]);
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const getUserToken = async () => {
    try {
      return await getToken({ template: "spotify-clone-template" });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data: userPlaylistsData, isFetched } = useQuery({
    queryKey: ["user_playlists"],
    queryFn: async () => {
      const { userPlaylists } = await getUserPlaylists(cookies.user_jwt);
      console.log("userPlaylists", userPlaylists);
      const typedPlaylists = userPlaylists.map((playlistInfo: Playlist) => {
        return { ...playlistInfo, type: "playlist" };
      });
      dispatch({ type: "SET_PLAYLISTS", data: typedPlaylists });
      return typedPlaylists;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const setUserToken = async () => {
    try {
      let token;
      if (!cookies.user_jwt) {
        token = await getUserToken();
        setCookies("user_jwt", token, {
          path: "/",
          expires: getCookieExpDate(new Date(), 1),
        });
      } else {
        token = cookies.user_jwt;
      }
      dispatch({ type: "SET_TOKEN", data: token });
    } catch (error) {
      console.error(error);
    }
  };

  const verifyFirstUserLogIn = async () => {
    const userData = state.userinfo;
    const user = await checkUserExistence(userData.token, userData.username);

    if (user && !user.exists) {
      addPlaylistToList(user?.playlists); // make sure the checkUserExistence returns the playlist
      // maybe this liked songs playlist could be a defualt one, the only thing is that we
      // have to be sure it has an existing id (to reference when user wants to navgate to it)
    }
  };

  const addPlaylistToList = (playlistData: Playlist | Playlist[]) => {
    if (playlistData instanceof Array) {
      dispatch({ type: "SET_PLAYLISTS", data: playlistData });
    } else {
      dispatch({
        type: "SET_PLAYLISTS",
        data: [...state.playlists, playlistData],
      });
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      dispatch({ type: "SET_USERNAME", data: user?.username });
    }

    setUserToken();
    verifyFirstUserLogIn();
  }, [isSignedIn]);

  useEffect(() => {
    addPlaylistToList(userPlaylistsData);
    console.log("userPlaylistsData", userPlaylistsData);
  }, [isFetched]);

  return (
    <UserDataContext.Provider
      value={{
        playlists: state.playlists,
        username: state.userinfo.username,
        userToken: state.userinfo.token,
        getUserToken,
        addPlaylistToList,
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
