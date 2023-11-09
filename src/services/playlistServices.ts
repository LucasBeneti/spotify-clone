export type Playlist = {
  name: string;
  cover_src: string;
  author: string;
  liked?: boolean;
  songs: {
    name: string;
    artist: string;
    album: string;
    date_added: Date;
    duration: number;
  }[];
};

export const getUserPlaylists = async (
  userId: string | number,
): Promise<Playlist[] | []> => {
  console.log("should return user with id", userId, "its playlists");
  return new Promise((resolve) => {
    resolve([
      {
        name: "Kenny Beats Boiler Room Barcelona",
        cover_src:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        author: "lucasbeneti",
        liked: true,
        songs: [
          {
            name: "LUMBERJACK",
            artist: "Tyler, The Creator",
            album: "Call Me If You Get Lost",
            date_added: new Date(),
            duration: 138,
          },
          {
            name: "LUMBERJACK",
            artist: "Tyler, The Creator",
            album: "Call Me If You Get Lost",
            date_added: new Date(),
            duration: 138,
          },
          {
            name: "LUMBERJACK",
            artist: "Tyler, The Creator",
            album: "Call Me If You Get Lost",
            date_added: new Date(),
            duration: 138,
          },
        ],
      },
    ]);
  });
};

export const addSongToPlaylist = (song_id: number, playlist_id: number) => {
  console.log("should add song of id", song_id, " to playlist", playlist_id);
};

export const removeSongFromPlaylist = () => {
  console.log("Attempting to delete song from playlist");
};
