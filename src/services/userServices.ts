const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const checkUserExistence = async (
  userToken: string,
  username?: string,
) => {
  if (!username) {
    console.error("No username was provided. Please passed that in.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const response = await fetch(`${SERVER_URL}/user`, {
    method: "GET",
    headers,
  });

  const { data } = await response.json();

  if (!data || !data.id) {
    const newUserRes = await fetch(`${SERVER_URL}/user`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    const { data: newUserData } = await newUserRes.json();
    return { ...newUserData, exists: false };
  }

  return { exists: true };
};

export const getUserInfo = async (userToken: string) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const response = await fetch(`${SERVER_URL}/user`, { headers });

  console.log("user data from server", response);
  return;
};

export const getUserPlaylistList = async (userToken: string) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const playlists = await fetch(`${SERVER_URL}/playlists`, { headers });

  return playlists;
};

// TODO GET last search or a random content

// TODO GET song that was being played before (maybe from local storage)
