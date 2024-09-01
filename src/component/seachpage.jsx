import axios from "axios";
import { useState } from "react";

export default function SearchPage({
  setEachPokemonData,
  setIsloading,
  setError,
  setOffset,
  setPageNumber,
}) {
  const [page, setPage] = useState();

  const getInputPage = (e) => {
    setPage(e.target.value);
  };

  const pokemonDataAtPage = async () => {
    try {
      setIsloading(true);
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 100}&limit=100`
      );
      const eachPokemonData = await Promise.all(
        result.data.results.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          return detail.data;
        })
      );
      setError(false);
      setIsloading(false);
      setEachPokemonData(eachPokemonData);
      setOffset((page - 1) * 100);
      setPage("");
      setPageNumber(Number(page));
    } catch (error) {
      setError(true);
      setIsloading(false);
      setPage("");
    }
  };

  return (
    <div>
      <input
        onChange={(e) => getInputPage(e)}
        className="bg-zinc-300"
        type="text"
        value={page}
      />
      <button onClick={pokemonDataAtPage}>go to Page</button>
    </div>
  );
}
