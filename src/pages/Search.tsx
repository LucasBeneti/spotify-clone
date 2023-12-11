import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterItem } from "../components/FilterItem";
import { SongList } from "../components/SongList";
import { VerticalCard } from "../components/VerticalCard";
import { BestResultCard } from "../components/BestResultCard";
import { Link, useSearchParams } from "react-router-dom";

export const Search = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const searchFilters = ["all", "artists", "songs", "albums"];

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const searchFilter = searchParams.get("search_filter");

  const handleSelectFilter = (f: string) => {
    if (f === "all" || !searchTerm) {
      searchParams.delete("search_filter");
      // searchParams.delete("q"); // TODO fix this logic to erase search term
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
        ? `http://localhost:3000/search/${searchTerm}/${searchFilter.toLowerCase()}`
        : `http://localhost:3000/search/${searchTerm}`;
      const searchRes = await fetch(requestURL);
      const parsed = await searchRes.json();
      if (isFilteredQuery) {
        return { [searchFilter]: parsed.filteredData };
      }

      return parsed;
    },
    retry: false,
  });

  const songResult = data?.songs;

  const artistsResult = data?.artists
    ? data.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        profileImage: artist.profile_image,
      }))
    : null;

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
                name={songResult[0].name}
                imgSrc={songResult[0]?.cover_art}
                authorName={songResult[0].author_name}
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
              {artistsResult &&
                artistsResult.map((artist) => (
                  <Link to={`/artist/${artist.id}`}>
                    <VerticalCard
                      title={artist.name}
                      subtitle="Artist"
                      coverSrc={artist.profileImage}
                      key={artist.id}
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
