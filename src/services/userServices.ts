const SERVER_URL = !import.meta.env.VITE_SERVER_URL;
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
