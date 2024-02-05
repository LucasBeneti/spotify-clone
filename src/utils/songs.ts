export const getSongDurationInMinutes = (durationInSeconds = 0) => {
  console.log(durationInSeconds);
  if (!durationInSeconds) return;

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  const formattedString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return formattedString;
};
