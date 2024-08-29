import axios from "axios";
import Searchbar from "./component/searchbar";
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [eachPokemonData, setEachPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const getPokemon = async () => {
    try {
      setIsloading(true);
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`
      );
      const eachPokemonData = await Promise.all(
        result.data.results.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          return detail.data;
        })
      );
      setIsloading(false);
      setPokemon(result.data);
      setEachPokemonData(eachPokemonData);
    } catch (error) {
      console.log(error);
      setIsloading(false);
      setError(true);
    }
  };

  const getNextPokemonData = () => {
    setOffset(offset + 100);
  };

  const getPrevPokemonData = () => {
    setOffset(offset - 100);
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  console.log(eachPokemonData);

  return (
    <div>
      <Searchbar
        setEachPokemonData={setEachPokemonData}
        setIsloading={setIsloading}
        setInput={setInput}
        input={input}
        setPokemon={setPokemon}
        offset={offset}
      />
      {isloading ? (
        <h1>loading...</h1>
      ) : error ? (
        <div>You did not catch the pokemon</div>
      ) : (
        <>
          <div className=" flex flex-wrap items-center justify-center">
            {eachPokemonData.map((card, index) => {
              return (
                <button
                  className="flex flex-col items-center justify-center font-body w-80 h-80 m-5 bg-white drop-shadow-2xl "
                  key={index}
                >
                  <img
                    className="w-48 h-48"
                    src={
                      card.sprites.other.dream_world.front_default
                        ? card.sprites.other.dream_world.front_default
                        : card.sprites.other["official-artwork"].front_default
                    }
                    alt="pokemon"
                  />
                  <p>{card.name}</p>
                </button>
              );
            })}
          </div>
          {eachPokemonData.length === 1 ? null : (
            <div>
              {eachPokemonData[0].id === 1 ? null : (
                <button onClick={getPrevPokemonData}>prev</button>
              )}
              {eachPokemonData.length < 100 ? null : (
                <button onClick={getNextPokemonData}>next</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
