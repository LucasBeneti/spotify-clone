export const getSongDurationInMinutes = (
  durationInSeconds: number | undefined,
) => {
  if (!durationInSeconds) return;

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  const formattedString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return formattedString;
};
