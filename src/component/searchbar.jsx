import axios from "axios";
import { useState } from "react";

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
        setError(false);
        setIsloading(false);
        setEachPokemonData(eachPokemonData);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setIsloading(true);
        const result2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
        );
        setError(false);
        setIsloading(false);
        setEachPokemonData([result2.data]);
        setInput("");
      } catch (error) {
        setError(true);
        setIsloading(false);
        setInput("");
      }
    }
  };

  return (
    <div>
      <input
        onChange={(e) => getInputPokemon(e)}
        className="bg-zinc-100"
        type="text"
        value={input}
      />
      <button onClick={getIndividualPokemonData}>search</button>
    </div>
  );
}
