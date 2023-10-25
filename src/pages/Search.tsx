import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

type StarWarsPlanet = {
  climate: string;
  name: string;
  gravity: string;
  rotationPeriod: string;
  population: string;
};

export const Search = () => {
  const searchResult = useLoaderData();
  const { state } = useNavigation();
  // TODO revisit this data showing/setting to understand better how this should work
  const [result, setResult] = useState<StarWarsPlanet>({
    climate: "test",
    name: "test",
    gravity: "test",
    rotationPeriod: "test",
    population: "test",
  });
  // useNavigation hook will give us loading state while routing
  useEffect(() => {
    if (searchResult) {
      // TODO try to type the result coming from the LoaderData hook
      const {
        climate,
        name,
        gravity,
        rotation_period: rotationPeriod,
        population,
      } = searchResult;
      setResult({
        climate,
        name,
        gravity,
        rotationPeriod,
        population,
      });
      console.log("Planet data", {
        climate,
        name,
        gravity,
        rotationPeriod,
        population,
      });
    }
  }, [searchResult]);

  return (
    <section className="mt-20">
      {state === "loading" && <h2>Loading...</h2>}
      Star Wars Planet
      <ul>
        {Object.entries(result).map(([key, value]) => (
          <li>
            {key}: {value}
          </li>
        ))}
      </ul>
    </section>
  );
};
