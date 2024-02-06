import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { FilterItem } from "@components/search/FilterItem";
import { SongList, VerticalCard } from "@components/reusable";
import { BestResultCard } from "@components/search/BestResultCard";
import { useCustomAudioContext } from "@contexts/CustomAudioContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type ArtistAttr = {
  id: string | number;
  name: string;
  profile_image: string;
};

export const Search = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const searchFilters = ["all", "artists", "songs", "albums"];

  const [searchParams, setSearchParams] = useSearchParams();
  const { playSongNow } = useCustomAudioContext();
  const searchTerm = searchParams.get("q");
  const searchFilter = searchParams.get("search_filter");

  const handleSelectFilter = (f: string) => {
    if (f === "all" || !searchTerm) {
      searchParams.delete("search_filter");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ q: searchTerm, search_filter: f });
    }
    setSelectedFilter(f);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search", searchTerm, searchFilter],
    queryFn: async () => {
      const isFilteredQuery = searchFilter !== "all" && searchFilter;
      const requestURL = isFilteredQuery
        ? `${SERVER_URL}/search/${searchTerm}/${searchFilter.toLowerCase()}`
        : `${SERVER_URL}/search/${searchTerm}`;
      const searchRes = await fetch(requestURL);
      const parsed = await searchRes.json();
      if (isFilteredQuery) {
        return { [searchFilter]: parsed.filteredData };
      }

      return parsed;
    },
    retry: false,
  });

  const songResult = data?.songs || null;

  const artistsResult = data?.artists || null;

  return (
    <section className="mt-20 mx-6 flex flex-col">
      {isLoading && <h2>Loading...</h2>}
      <section className="flex gap-x-4">
        {searchFilters.map((filter, index) => (
          <FilterItem
            onClickHandle={() => handleSelectFilter(filter)}
            text={filter}
            selected={filter === selectedFilter}
            key={`${filter}_${index}`}
          />
        ))}
      </section>
      {songResult && (
        <main className="flex gap-x-6 flex-col lg:flex-row">
          <section className="mt-4 flex flex-col gap-y-2">
            <h3 className="text-2xl font-display font-bold mb-4">
              Best result
            </h3>
            <section className="flex">
              <BestResultCard
                song={songResult[0]}
                handlePlaySong={playSongNow}
              />
            </section>
          </section>
          <section className="mt-4 flex flex-col gap-y-2 w-full">
            <h3 className="text-2xl font-display font-bold mb-4">Songs</h3>
            <section className="flex">
              <SongList songs={songResult} />
            </section>
          </section>
        </main>
      )}
      {artistsResult && (
        <section className="flex flex-1 flex-col mt-4">
          <h3 className="text-2xl font-display font-bold mb-4">Artists</h3>
          <div className="">
            <section className="flex gap-x-6 scroll-smooth overflow-x-auto">
              {artistsResult.map((artist: ArtistAttr, index: number) => (
                <Link
                  to={`/artist/${artist.id}`}
                  key={`${artist.name}_${index}`}
                >
                  <VerticalCard
                    title={artist.name}
                    subtitle="Artist"
                    coverSrc={artist.profile_image}
                  />
                </Link>
              ))}
            </section>
          </div>
        </section>
      )}
    </section>
  );
};
