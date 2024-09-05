import axios from "axios";
import searchPage from "../assets/64759.png";

export default function SearchPage({
  setEachPokemonData,
  setIsloading,
  setError,
  setOffset,
  setPageNumber,
  setPage,
  page,
}) {
  const getInputPage = (e) => {
    setPage(Number(e.target.value));
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
      setPageNumber(Number(page));
      setPage("");
    } catch (error) {
      setError(true);
      setIsloading(false);
      setPage("");
    }
  };

  return (
    <div className="flex items-center justify-center w-36 bg-white rounded-full">
      <input
        max={14}
        min={1}
        onChange={(e) => getInputPage(e)}
        placeholder="Page"
        className="w-16 h-10  bg-white outline-none"
        type="number"
        value={page}
      />
      <img
        onClick={pokemonDataAtPage}
        className="h-7 cursor-pointer ml-3"
        src={searchPage}
        alt="searchPage"
      />
    </div>
  );
}
