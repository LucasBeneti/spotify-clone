export type Playlist = {
  id: number;
  playlist_id?: number;
  cover_src?: string;
  name: string;
  description?: string;
  author_username: string;
  type?: string;
};

export const getUserPlaylists = async (token: string) => {
  if (!token) {
    return { error: "No token provided." };
  }

  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch("http://localhost:3000/playlist/user", {
    method: "GET",
    headers,
  });
  return await response.json();
};

export const getPlaylistFullInfo = async (
  token: string | null | undefined,
  playlistId: string,
) => {
  const playlistInfoResponse = await fetch(
    `http://localhost:3000/playlist/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const { playlistInfo } = await playlistInfoResponse.json();

  const playlistSongsResponse = await fetch(
    `http://localhost:3000/playlist/songs/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const { songs } = await playlistSongsResponse.json();
  const playlistFullInfo = {
    ...playlistInfo,
    songs,
  };

  return playlistFullInfo;
};

export const addSongToPlaylist = async (
  song_id: number,
  playlist_id: number,
  token: string | undefined,
) => {
  const response = await fetch(
    `http://localhost:3000/playlist/add/song/${playlist_id}`,

    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ song_id: song_id }),
    },
  );

  return response;
  console.log("should add song of id", song_id, " to playlist", playlist_id);
};

export const removeSongFromPlaylist = () => {
  console.log("Attempting to delete song from playlist");
};
