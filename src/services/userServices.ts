const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const checkUserExistence = async (
  userToken: string,
  username: string,
) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const { data } = await fetch(`${SERVER_URL}/user`, { headers });
  if (!data?.id) {
    const newUserData = await fetch(`${SERVER_URL}/user`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    return newUserData;
  }
  return !!data?.id;
};

// implement a method to fetch user data (useful to verify if the users is new)
export const getUserInfo = async (userToken: string) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const response = await fetch(`${SERVER_URL}/user`, { headers });

  console.log("user data from server", response);
  return;
};

// TODO GET user playlists (only main info)
export const getUserPlaylistList = async (userToken: string) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const playlists = await fetch(`${SERVER_URL}/playlists`, { headers });

  return playlists;
};

// TODO GET last search or a random content

// TODO GET song that was being played before (maybe from local storage)
