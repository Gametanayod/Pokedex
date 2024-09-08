import axios from "axios";
import Searchbar from "./component/searchbar";
import Error from "./component/error";
import Loading from "./component/loading";
import Card from "./component/card";
import pokedexLogo from "./assets/Pokédex_logo.png";
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [eachPokemonData, setEachPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [buttonPopup, setButtonPopup] = useState({
    show: false,
    pokemonId: null,
  });

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
      setTimeout(() => {
        setIsloading(false);
        setPokemon(result.data);
        setEachPokemonData(eachPokemonData);
        checkPage(eachPokemonData);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsloading(false);
        setError(true);
      }, 1000);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  return (
    <div className="flex flex-col items-center  bg-main min-h-screen font-Nunito">
      {buttonPopup.show && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
      <div className="w-full h-32 flex items-center justify-center gap-5 bg-red-600 drop-shadow-2xl rounded-b-full">
        <img className="h-24" src={pokedexLogo} alt="Logo" />
        <Searchbar
          setEachPokemonData={setEachPokemonData}
          setIsloading={setIsloading}
          setInput={setInput}
          input={input}
          offset={offset}
          setError={setError}
        />
      </div>
      {isloading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <Card
          eachPokemonData={eachPokemonData}
          pokemon={pokemon}
          setOffset={setOffset}
          setButtonPopup={setButtonPopup}
          buttonPopup={buttonPopup}
          offset={offset}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
}
