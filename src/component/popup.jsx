import koraidonLimite from "../assets/1007Koraidon_Dream_6.png";
import koraidonSprint from "../assets/1007Koraidon_Dream_3.png";
import koraidonSwim from "../assets/1007Koraidon_Dream_7.png";
import koraidonGlide from "../assets/1007Koraidon_Dream_4.png";
import miraidonLowpower from "../assets/1008Miraidon_Dream_5.png";
import miraidonDrive from "../assets/1008Miraidon_Dream_4.png";
import miraidonAquatic from "../assets/1008Miraidon_Dream_6.png";
import miraidonGlide from "../assets/1008Miraidon_Dream_3.png";

export default function Popup({ trigger, settrigger, card }) {
  const handleRedirect = (ability) => {
    return window.open(`https://pokemondb.net/ability/${ability}`, "_blank");
  };

  return trigger.show ? (
    <div
      onClick={() => settrigger({ show: false })}
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex bg-pokeball w-[880px] h-[480px] font-Nunito text-xl rounded-2xl shadow-lg relative"
      >
        <div className="flex items-center">
          <img
            className="w-[380px] h-[380px] mx-8"
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
          <div className="flex flex-col w-[400px] h-[380px] justify-around items-center bg-white shadow-2xl rounded-3xl">
            <p className="text-3xl font-bold">{card.name}</p>
            <div className="flex w-44 items-center gap-7 justify-center ">
              <p className="text-2xl text-red-800">type</p>
              {card.types.map((type, index) => {
                return (
                  <div
                    className={`${
                      type.type.name === "water"
                        ? "bg-blue-100 p-1 rounded-lg hover:bg-blue-300 text-base"
                        : type.type.name === "grass"
                        ? "bg-green-100 p-1 rounded-lg hover:bg-green-300 text-base"
                        : type.type.name === "poison"
                        ? "bg-violet-100 p-1 rounded-lg hover:bg-violet-300 text-base"
                        : type.type.name === "fire"
                        ? "bg-red-100 p-1 rounded-lg hover:bg-red-300 text-base"
                        : type.type.name === "flying"
                        ? "bg-sky-100 p-1 rounded-lg hover:bg-sky-300 text-base"
                        : type.type.name === "bug"
                        ? "bg-lime-100 p-1 rounded-lg hover:bg-lime-300 text-base"
                        : type.type.name === "electric"
                        ? "bg-yellow-100 p-1 rounded-lg hover:bg-yellow-300 text-base"
                        : type.type.name === "ground"
                        ? "bg-amber-100 p-1 rounded-lg hover:bg-amber-300 text-base"
                        : type.type.name === "fairy"
                        ? "bg-pink-100 p-1 rounded-lg hover:bg-pink-300 text-base"
                        : type.type.name === "normal"
                        ? "bg-neutral-100 p-1 rounded-lg hover:bg-neutral-300 text-base"
                        : type.type.name === "psychic"
                        ? "bg-rose-100 p-1 rounded-lg hover:bg-rose-300 text-base "
                        : type.type.name === "steel"
                        ? "bg-zinc-100 p-1 rounded-lg hover:bg-zinc-300 text-base"
                        : type.type.name === "fighting"
                        ? "bg-orange-100 p-1 rounded-lg hover:bg-orange-300 text-base"
                        : type.type.name === "dark"
                        ? "bg-gray-100 p-1 rounded-lg hover:bg-gray-300 text-base"
                        : type.type.name === "ice"
                        ? "bg-cyan-100 p-1 rounded-lg hover:bg-cyan-300 text-base"
                        : type.type.name === "dragon"
                        ? "bg-indigo-100 p-1 rounded-lg hover:bg-indigo-300 text-base"
                        : type.type.name === "rock"
                        ? "bg-stone-200 p-1 rounded-lg hover:bg-stone-400 text-base"
                        : type.type.name === "ghost"
                        ? "bg-purple-100 p-1 rounded-lg hover:bg-purple-300 text-base"
                        : "bg-white"
                    }`}
                    key={index}
                  >
                    {type.type.name}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-center gap-1 ">
              <p className="text-2xl text-red-800">status</p>
              {card.stats.map((status, index) => {
                return (
                  <div
                    className="flex w-80 items-center justify-between border-2 border-white hover:border-gray-200 text-base"
                    key={index}
                  >
                    <p>{status.stat.name}</p>
                    <div className="flex flex-col justify-center">
                      {status.stat.name === "hp" ? (
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 255) * 100}%`,
                            }}
                          ></div>
                        </div>
                      ) : status.stat.name === "attack" ? (
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 190) * 100}%`,
                            }}
                          ></div>
                        </div>
                      ) : status.stat.name === "defense" ? (
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 250) * 100}%`,
                            }}
                          ></div>
                        </div>
                      ) : status.stat.name === "special-attack" ? (
                        <div className="w-[10rem]  rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full  text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 194) * 100}%`,
                            }}
                          ></div>
                        </div>
                      ) : status.stat.name === "special-defense" ? (
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 230) * 100}%`,
                            }}
                          ></div>
                        </div>
                      ) : (
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
                            style={{
                              width: `${(status.base_stat / 200) * 100}%`,
                            }}
                          ></div>
                        </div>
                      )}

                      <p>{status.base_stat}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-5">
              <p className="text-2xl text-red-800">ability</p>
              {card.abilities.map((ability, index) => {
                return (
                  <button
                    onClick={() => {
                      handleRedirect(ability.ability.name);
                    }}
                    className="text-base hover:underline"
                    key={index}
                  >
                    {ability.ability.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
