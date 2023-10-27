import { useNavigation, useLoaderData } from "react-router-dom";

type PlaylistData = {
  cover_src: string;
  name: string;
  author: string;
  songs: {
    name: string;
    artist: string;
    album: string;
    date_added: Date;
    duration: number;
  }[];
};

export const PlaylistPage = () => {
  const data = useLoaderData() as PlaylistData;
  const { state } = useNavigation();

  return (
    <>
      <div className="mx-4">
        <header className="w-100 bg-transparent mt-24">
          <section className="flex gap-x-4 items-end">
            <img
              src={data.cover_src}
              alt="playlist cover art"
              className="w-48"
            />
            <div>
              <p className="text-xs">Playlist</p>
              <h3 className="sm:text-lg md:text-2xl xl:text-5xl font-display font-bold mt-3 mb-6">
                {data.name}
              </h3>
              <p className="text-xs font-bold">{data.author}</p>
            </div>
          </section>
        </header>
        <main className="w-full">
          <table className="table-auto">
            {/* // TODO implementar um styling mais bonito pra essa table */}
            <thead className="my-2">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Added</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {state === "loading" ? (
                <h2>Loading...</h2>
              ) : (
                data.songs.map((song, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{song.name}</td>
                      <td>{song.album}</td>
                      <td>9 de jun. de 2022</td>
                      <td>{song.duration}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export const playlistLoader = async ({
  params,
}): Promise<PlaylistData | unknown> => {
  const { id } = params;

  const res = new Promise((resolve, reject) => {
    resolve({
      cover_src:
        "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      name: "Kenny Beats Boiler Room Barcelona",
      author: "lucasbeneti",
      songs: [
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
        {
          name: "LUMBERJACK",
          artist: "Tyler, The Creator",
          album: "Call Me If You Get Lost",
          date_added: Date.now(),
          duration: 138,
        },
      ],
    });
  });

  return await res;
};
