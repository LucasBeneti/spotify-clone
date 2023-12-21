const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getAlbumFullInfo = async (token: string, album_id: string) => {
  try {
    const albumBasicInfo = await fetch(`${SERVER_URL}/albums/${album_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { album } = await albumBasicInfo.json();
    return album;

    // return albumSongs;
  } catch (error) {
    console.error("Error while trying o fetch album data.");
  }
};

export const getAlbumSongs = async (token: string, album_id: string) => {
  try {
    const albumResponse = await fetch(
      `${SERVER_URL}/albums/songs/${album_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const { albumSongs } = await albumResponse.json();

    return albumSongs;
  } catch (error) {
    console.error("Error while trying o fetch album data.");
  }
};
