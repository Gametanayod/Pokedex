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

  const checkPage = (array) => {
    if (array.length === 0) {
      return true;
    }
  };

  const pokemonPopup = (pokemonId) => {
    setButtonPopup({ show: true, pokemonId });
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  console.log(eachPokemonData);
  console.log(buttonPopup);

  return (
    <div className="relative">
      {buttonPopup.show && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

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
        setOffset={setOffset}
        setPageNumber={setPageNumber}
      />
      {isloading ? (
        <h1>
          {/* Loading Spinner */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            {/* SVG Loading Animation */}
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
          loading...
        </h1>
      ) : error ? (
        <h1>You did not catch the pokemon</h1>
      ) : checkPage(eachPokemonData) ? (
        <h1>not found page</h1>
      ) : (
        <>
          {/* Pagination Controls */}
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
          {/* Pokemon Cards */}
          <div className="flex flex-wrap items-center justify-center">
            {eachPokemonData.map((card, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => pokemonPopup(card.id)}
                    className="flex flex-col items-center justify-center font-body w-80 h-80 m-5 bg-white drop-shadow-2xl"
                  >
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
        </>
      )}
    </div>
  );
}
