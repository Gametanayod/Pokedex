import axios from "axios";
import Searchbar from "./component/searchbar";
import SearchPage from "./component/seachpage";
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [eachPokemonData, setEachPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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
      setIsloading(false);
      setError(true);
    }
  };

  const getNextPokemonData = () => {
    setOffset(offset + 100);
    setPageNumber(pageNumber + 1);
  };

  const getPrevPokemonData = () => {
    setOffset(offset - 100);
    setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  console.log(eachPokemonData);
  console.log(pokemon);

  return (
    <div>
      <Searchbar
        setEachPokemonData={setEachPokemonData}
        setIsloading={setIsloading}
        setInput={setInput}
        input={input}
        offset={offset}
        setError={setError}
      />
      <SearchPage
        setEachPokemonData={setEachPokemonData}
        setIsloading={setIsloading}
        setInput={setInput}
        setError={setError}
      />
      {isloading ? (
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g stroke="currentColor">
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                stroke-linecap="round"
                stroke-width="3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0 150;42 150;42 150;42 150"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite"
                  values="0;-16;-59;-59"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                dur="2s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </g>
          </svg>
          loading...
        </h1>
      ) : error ? (
        <h1>You did not catch the pokemon</h1>
      ) : (
        <>
          {eachPokemonData.length === 1 ? null : (
            <div>
              {eachPokemonData.length > 0 &&
              eachPokemonData[0].id === 1 ? null : (
                <button onClick={getPrevPokemonData}>prev</button>
              )}
              <span>{pageNumber}</span>
              {eachPokemonData.length < 100 ? null : (
                <button onClick={getNextPokemonData}>next</button>
              )}
            </div>
          )}
          <div className=" flex flex-wrap items-center justify-center">
            {eachPokemonData.map((card, index) => {
              return (
                <button
                  className="flex flex-col items-center justify-center font-body w-80 h-80 m-5 bg-white drop-shadow-2xl "
                  key={index}
                >
                  <img
                    className="w-48 h-48"
                    src={card.sprites.other["official-artwork"].front_default}
                    alt="pokemon"
                  />
                  <p>{card.name}</p>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
