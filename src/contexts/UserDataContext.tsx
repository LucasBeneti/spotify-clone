import { createContext, useEffect, useContext, useReducer } from "react";
import { useCookies } from "react-cookie";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { userReducer, initialUserState } from "./UserDataReducer";
import { getCookieExpDate } from "@utils/date";
import { Playlist, getUserPlaylists } from "@services/playlistServices";
import { checkUserExistence } from "@services/userServices";

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

  const { data: userPlaylists, isFetched } = useQuery({
    queryKey: ["user_playlists"],
    queryFn: async () => {
      const userToken =
        cookies.user_jwt || state.userinfo.token || (await getUserToken());
      const { userPlaylists } = await getUserPlaylists(userToken);
      const typedPlaylists = userPlaylists.map((playlistInfo: Playlist) => {
        return { ...playlistInfo, type: "playlist" };
      });

      dispatch({ type: "SET_PLAYLISTS", data: typedPlaylists });
      return typedPlaylists || [];
    },
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

  const verifyFirstUserLogIn = async (username: string | null) => {
    // TODO solve a bug that involves the username parameter, when it is passed to the checkUserExistence
    // turns the request not being sent with the token
    if (username) {
      console.log("username value coming from upstream", username);
      const userData = state.userinfo;
      const user = await checkUserExistence(userData.token, username);

      if (user && !user.exists) {
        const { likedSongsPlaylist } = user;
        addPlaylistToList(likedSongsPlaylist);
      }
    }
  };

  const addPlaylistToList = (playlistData: Playlist | Playlist[]) => {
    if (playlistData instanceof Array) {
      dispatch({ type: "SET_PLAYLISTS", data: playlistData });
    } else if (playlistData?.playlist_id) {
      playlistData.id = playlistData.playlist_id;
      playlistData.type = "playist";
      dispatch({
        type: "SET_PLAYLISTS",
        data: [...state.playlists, playlistData],
      });
    }
  };

  useEffect(() => {
    setUserToken();
    if (isSignedIn) {
      dispatch({ type: "SET_USERNAME", data: user?.username });

      verifyFirstUserLogIn(user?.username);
    }

    if (isFetched) {
      addPlaylistToList(userPlaylists);
      console.log("userPlaylists", userPlaylists);
    }
  }, [isSignedIn, isFetched]);

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
