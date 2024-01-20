const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const likeSong = async (song_id: number, token: string) => {
  if (!song_id) {
    console.error("Tried to like song with id: ", song_id);
    return;
  }

  await fetch(`${SERVER_URL}/user/song/like/${song_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const dislikeSong = async (song_id: number, token: string) => {
  if (!song_id) {
    console.error("Tried to like song with id: ", song_id);
    return;
  }

  await fetch(`${SERVER_URL}/user/song/dislike/${song_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
