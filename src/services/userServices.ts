// TODO GET user playlists (only main info)
export const getUserPlaylistList = async (userToken: string) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const playlists = await fetch("http://localhost:3000/playlists", { headers });

  return playlists;
};

// TODO GET last search or a random content

// TODO GET song that was being played before (maybe from local storage)
