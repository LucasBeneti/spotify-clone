export const handleToggleLikeSong = (
  user_id: number,
  song_id: number,
  callBack: () => void,
) => {
  // TODO create service to handle user like/dislike a song
  // probably should create a table (would work like the playlist <-> songs relationship)
  // TODO implement the actual function that will do the call for the API
  console.log("liking song");
  callBack();
};
