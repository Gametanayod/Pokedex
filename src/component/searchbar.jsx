import axios from "axios";
import searchIcon from "../assets/609652-200.png";
import pokeball from "../assets/1169608.png";

export default function Searchbar({
  setEachPokemonData,
  setIsloading,
  setInput,
  input,
  offset,
  setError,
}) {
  const getInputPokemon = (e) => {
    setInput(e.target.value);
  };

  const getIndividualPokemonData = async () => {
    if (input === "") {
      try {
        setIsloading(true);
        const result1 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`
        );
        const eachPokemonData = await Promise.all(
          result1.data.results.map(async (pokemon) => {
            const detail = await axios.get(pokemon.url);
            return detail.data;
          })
        );
        setTimeout(() => {
          setError(false);
          setIsloading(false);
          setEachPokemonData(eachPokemonData);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setIsloading(true);
        const result2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
        );
        setTimeout(() => {
          setError(false);
          setIsloading(false);
          setEachPokemonData([result2.data]);
          setInput("");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          setError(true);
          setIsloading(false);
          setInput("");
        }, 1000);
      }
    }
  };

  return (
    <div className="flex items-center justify-around w-96 bg-white rounded-full focus-within:outline focus-within:outline-4 focus-within:outline-blue-600">
      <img className="h-9" src={pokeball} alt="pokeballIcon" />
      <input
        onChange={(e) => getInputPokemon(e)}
        placeholder="Search Pokemon by name or ID"
        className="w-60 h-11  bg-white outline-none"
        type="text"
        value={input}
      />
      <img
        onClick={getIndividualPokemonData}
        className="h-10 cursor-pointer"
        src={searchIcon}
        alt="searchPokemon"
      />
    </div>
  );
}
