import { createContext, useEffect, useContext, useReducer } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useCookies } from "react-cookie";
import { userReducer, initialUserState } from "./UserDataReducer";

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
  username?: string;
  userToken?: string;
  getUserToken: () => Promise<string | null>;
};

export const UserDataContext = createContext<UserDataContext>({ username: "" });
interface UserDataContextProps {
  children: React.ReactNode;
}

export const UserDataContextProvider = ({ children }: UserDataContextProps) => {
  const [cookies, setCookies] = useCookies(["user_jwt"]);
  const { user } = useUser(); // username nao esta definido quando renderiza o componente (tenho que entender melhor isso)
  const { getToken } = useAuth();
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const getUserToken = async () => {
    try {
      return await getToken({ template: "spotify-clone-template" });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const setUserToken = async () => {
    try {
      let token;
      if (!cookies.user_jwt) {
        token = await getUserToken();
        setCookies("user_jwt", token, { path: "/" });
      } else {
        token = cookies.user_jwt;
      }
      dispatch({ type: "SET_TOKEN", data: token });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserToken();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        playlists: state.playlists,
        username: state.userinfo.username,
        userToken: state.userinfo.token,
        getUserToken,
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
