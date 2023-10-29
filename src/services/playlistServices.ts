export const getUserPlaylists = async (userId: string | number) => {
  console.log("should return user with id", userId, "its playlists");
  return new Promise((resolve, reject) => {
    resolve({
      songs: [],
    });
  });
};

export const addSongToPlaylist = (song_id, playlist_id) => {
  console.log("should add song of id", song_id, " to playlist");
};

export const removeSongFromPlaylist = () => {
  console.log("Attempting to delete song from playlist");
};
