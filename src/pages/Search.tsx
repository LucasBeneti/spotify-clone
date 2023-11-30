import { useState } from "react";
import { FilterItem } from "../components/FilterItem";
import { SongList } from "../components/SongList";
import { VerticalCard } from "../components/VerticalCard";
import { useSearchStore } from "../store/searchStore";
import { useQuery } from "@tanstack/react-query";
import { BestResultCard } from "../components/BestResultCard";

const testSearchData = {
  artist: {
    name: "Tyler, The Creator",
    imgSrc: "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
    songs: [
      {
        name: "See You Again (feat. Kali Uchis)",
        albumCover:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      },
      {
        name: "EARTHQUAKE",
        albumCover:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        explicit: true,
      },
      {
        name: "NEW MAGIC WAND",
        albumCover:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      },
      {
        name: "GONE, GONE/ THANK YOU",
        albumCover:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      },
    ],
    playlists: [
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
      {
        name: "This is Tyler, the Creator",
        coverSrc:
          "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
        owner: "Spotify",
      },
    ],
  },
};

export const Search = () => {
  // const searchResult = useLoaderData();
  const [selectedFilter, setSelectedFilter] = useState("All");
  // TODO revisit this data showing/setting to understand better how this should work

  const { artist } = testSearchData;
  // TODO depending on the filter selected, should render a different UI with the result of the filtered search
  const searchFilters = ["All", "Artists", "Songs", "Albums"];
  const searchTerm = useSearchStore((state) => state.searchTerm); // TODO what if we get the state from the URL?

  const { data, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const searchRes = await fetch(
        `http://localhost:3000/search/${searchTerm}`,
      );
      const parsed = await searchRes.json();
      console.log(parsed);

      return parsed;
    },
    retry: false,
  });

  const songResult = data
    ? data.songs?.map((song) => ({
        name: song.name,
        albumCoverArt: song.album_cover_art,
        authorName: song.author_name,
        albumName: song.album_name,
      }))
    : null;

  return (
    <section className="mt-20 mx-6 flex flex-col">
      {isLoading && <h2>Loading...</h2>}
      <section className="flex gap-x-4">
        {searchFilters.map((filter, index) => (
          <FilterItem
            onClickHandle={() => setSelectedFilter(filter)}
            text={filter}
            selected={filter === selectedFilter}
            key={`${filter}_${index}`}
          />
        ))}
      </section>
      <main className="flex gap-x-6 flex-col lg:flex-row">
        {songResult && (
          <section className="mt-4 flex flex-col gap-y-2">
            <h3 className="text-2xl font-display font-bold mb-4">
              Best result
            </h3>
            <section className="flex">
              <BestResultCard
                name={songResult[0].name}
                imgSrc={songResult[0].albumCoverArt}
                authorName={songResult[0].authorName}
              />
            </section>
          </section>
        )}
        {songResult ? (
          <section className="mt-4 flex flex-col gap-y-2 w-full">
            <h3 className="text-2xl font-display font-bold mb-4">Songs</h3>
            <section className="flex">
              <SongList songs={songResult} />
            </section>
          </section>
        ) : null}
      </main>
      <section className="flex flex-1 flex-col mt-4">
        <h3 className="text-2xl font-display font-bold mb-4">
          With {artist.name}
        </h3>
        <div className="">
          <section className="flex gap-x-6 scroll-smooth overflow-x-auto">
            {artist.playlists.map((playlist, index) => (
              <VerticalCard
                title={playlist.name}
                subtitle={playlist.owner}
                coverSrc={playlist.coverSrc}
                key={`${playlist}_${index}`}
              />
            ))}
          </section>
        </div>
      </section>
    </section>
  );
};
