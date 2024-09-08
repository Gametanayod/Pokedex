import koraidonLimite from "../assets/1007Koraidon_Dream_6.png";
import koraidonSprint from "../assets/1007Koraidon_Dream_3.png";
import koraidonSwim from "../assets/1007Koraidon_Dream_7.png";
import koraidonGlide from "../assets/1007Koraidon_Dream_4.png";
import miraidonLowpower from "../assets/1008Miraidon_Dream_5.png";
import miraidonDrive from "../assets/1008Miraidon_Dream_4.png";
import miraidonAquatic from "../assets/1008Miraidon_Dream_6.png";
import miraidonGlide from "../assets/1008Miraidon_Dream_3.png";
import Popup from "./popup";

export default function Card({
  eachPokemonData,
  pokemon,
  setOffset,
  setButtonPopup,
  buttonPopup,
  offset,
  setPageNumber,
  pageNumber,
}) {
  const getNextPokemonData = () => {
    setOffset(offset + 100);
    setTimeout(() => {
      setPageNumber(pageNumber + 1);
    }, 1000);
  };

  const getPrevPokemonData = () => {
    setOffset(offset - 100);
    setTimeout(() => {
      setPageNumber(pageNumber - 1);
    }, 1000);
  };

  const pokemonPopup = (pokemonId) => {
    setButtonPopup({ show: true, pokemonId });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {eachPokemonData.length === 1 ? null : (
        <div className="w-72 h-36 flex flex-col items-center justify-center  gap-5 ">
          <div className="flex bg-slate-300 w-56 rounded-lg gap-5 text-3xl items-center justify-center drop-shadow-2xl">
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
                className="flex flex-col  text-2xl font-medium items-center justify-around  w-64 h-64 m-5 btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded drop-shadow-2xl"
              >
                <div className="flex w-60 justify-end ">
                  <p>#{formattedId}</p>
                </div>
                <img
                  className="w-40 h-40"
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
  );
}
