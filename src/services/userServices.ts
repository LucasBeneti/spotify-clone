export const getUserInfo = async (username: string) => {
  // const userInfo = await fetch();
  return new Promise((resolve, reject) => {
    resolve({
      username,
      user_id: 1,
      following_artists: [],
    });
  });
};

// TODO GET user playlists (only main info)

// TODO GET last search or a random content

// TODO GET song that was being played before (maybe from local storage)
