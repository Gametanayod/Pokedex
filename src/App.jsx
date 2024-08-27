import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [isloading, setIsloading] = useState(false);

  const getPokemonData = async () => {
    try {
      const result = await axios.get(url);
      setIsloading(false);
      setNextUrl(result.data.next);
      setPrevUrl(result.data.previous);
      setPokemon(result.data.results);
    } catch (error) {
      throw error;
    }
  };

  const getNextPokemonData = () => {
    setUrl(nextUrl);
  };

  const getPrevPokemonData = () => {
    setUrl(prevUrl);
  };

  useEffect(() => {
    setIsloading(true);
    getPokemonData();
  }, [url]);

  console.log(pokemon);
  console.log(nextUrl);

  return (
    <div>
      {isloading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div>
            {pokemon.map((items, index) => {
              return <div key={index}>{items.name}</div>;
            })}
          </div>
          {prevUrl && <button onClick={getPrevPokemonData}>prev</button>}
          {nextUrl && <button onClick={getNextPokemonData}>next</button>}
        </>
      )}
    </div>
  );
}
