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
