import axios from "axios";
import Searchbar from "./component/searchbar";
import SearchPage from "./component/seachpage";
import koraidonLimite from "./assets/1007Koraidon_Dream_6.png";
import koraidonSprint from "./assets/1007Koraidon_Dream_3.png";
import koraidonSwim from "./assets/1007Koraidon_Dream_7.png";
import koraidonGlide from "./assets/1007Koraidon_Dream_4.png";
import miraidonLowpower from "./assets/1008Miraidon_Dream_5.png";
import miraidonDrive from "./assets/1008Miraidon_Dream_4.png";
import miraidonAquatic from "./assets/1008Miraidon_Dream_6.png";
import miraidonGlide from "./assets/1008Miraidon_Dream_3.png";
import pokedexLogo from "./assets/Pokédex_logo.png";
import Popup from "./component/popup";
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [eachPokemonData, setEachPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState();
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
      setIsloading(false);
      setPokemon(result.data);
      setEachPokemonData(eachPokemonData);
      checkPage(eachPokemonData);
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

  const checkPage = (array, page) => {
    if (array.length === 0 || page < 1) {
      return true;
    }
  };

  const pokemonPopup = (pokemonId) => {
    setButtonPopup({ show: true, pokemonId });
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  console.log(pokemon);
  console.log(typeof page);

  return (
    <div className="flex flex-col items-center  bg-main min-h-screen font-Nunito">
      {buttonPopup.show && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
      <div className="w-full h-40 flex items-center justify-center gap-5 bg-red-600 drop-shadow-2xl rounded-b-full">
        <img className="h-28" src={pokedexLogo} alt="Logo" />
        <Searchbar
          setEachPokemonData={setEachPokemonData}
          setIsloading={setIsloading}
          setInput={setInput}
          input={input}
          offset={offset}
          setError={setError}
        />
        {/* <SearchPage
          setEachPokemonData={setEachPokemonData}
          setIsloading={setIsloading}
          setInput={setInput}
          setError={setError}
          setOffset={setOffset}
          setPageNumber={setPageNumber}
          page={page}
          setPage={setPage}
        /> */}
      </div>
      {isloading ? (
        <div className="flex w-96 h-24 items-center justify-center bg-gray-300">
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
                strokeLinecap="round"
                strokeWidth="3"
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
        </div>
      ) : error ? (
        <h1>You did not catch the pokemon</h1>
      ) : checkPage(eachPokemonData, page) ? (
        <h1>not found page</h1>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {eachPokemonData.length === 1 ? null : (
            <div className="w-96 h-44 flex flex-col items-center justify-center  gap-5 ">
              <div className="flex bg-slate-300 w-56 rounded-lg gap-5 text-4xl items-center justify-center drop-shadow-2xl">
                <p>Page</p>
                <p>
                  {pageNumber}/{Math.ceil(pokemon.count / 100)}
                </p>
              </div>
              <div className="w-44 h-10 flex items-center gap-5 justify-center text-2xl">
                {eachPokemonData.length > 0 &&
                eachPokemonData[0].id === 1 ? null : (
                  <button
                    className="w-20 bg-red-400 font-bold rounded-lg hover:bg-red-300 drop-shadow-2xl"
                    onClick={getPrevPokemonData}
                  >
                    Prev
                  </button>
                )}

                {eachPokemonData.length < 100 ? null : (
                  <button
                    className="w-20 bg-blue-400 font-bold rounded-lg hover:bg-blue-300 drop-shadow-2xl"
                    onClick={getNextPokemonData}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center">
            {eachPokemonData.map((card, index) => {
              const formattedId = card.id.toString().padStart(4, "0");
              return (
                <div key={index}>
                  <button
                    onClick={() => pokemonPopup(card.id)}
                    className="flex flex-col  text-2xl font-medium items-center justify-around  w-80 h-80 m-5 btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded drop-shadow-2xl"
                  >
                    <div className="flex w-60 justify-end ">
                      <p>#{formattedId}</p>
                    </div>
                    <img
                      className="w-48 h-48"
                      src={
                        card.sprites.other["official-artwork"].front_default
                          ? card.sprites.other["official-artwork"].front_default
                          : card.id === 10264
                          ? koraidonLimite
                          : card.id === 10265
                          ? koraidonSprint
                          : card.id === 10266
                          ? koraidonSwim
                          : card.id === 10267
                          ? koraidonGlide
                          : card.id === 10268
                          ? miraidonLowpower
                          : card.id === 10269
                          ? miraidonDrive
                          : card.id === 10270
                          ? miraidonAquatic
                          : card.id === 10271
                          ? miraidonGlide
                          : card.sprites.other.home.front_default
                      }
                      alt="pokemon"
                    />
                    <p>{card.name}</p>
                  </button>
                  {buttonPopup.show && buttonPopup.pokemonId === card.id && (
                    <Popup
                      settrigger={setButtonPopup}
                      trigger={buttonPopup}
                      card={card}
                    ></Popup>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
