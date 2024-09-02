import koraidonLimite from "../assets/1007Koraidon_Dream_6.png";
import koraidonSprint from "../assets/1007Koraidon_Dream_3.png";
import koraidonSwim from "../assets/1007Koraidon_Dream_7.png";
import koraidonGlide from "../assets/1007Koraidon_Dream_4.png";
import miraidonLowpower from "../assets/1008Miraidon_Dream_5.png";
import miraidonDrive from "../assets/1008Miraidon_Dream_4.png";
import miraidonAquatic from "../assets/1008Miraidon_Dream_6.png";
import miraidonGlide from "../assets/1008Miraidon_Dream_3.png";

export default function Popup({ trigger, settrigger, card }) {
  return trigger.show ? (
    <div
      onClick={() => settrigger({ show: false })}
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex  bg-pokeball w-[1000px] h-[500px] font-Nunito text-xl rounded-2xl shadow-lg relative"
      >
        <div className="flex items-center">
          <img
            className="w-[475px] h-[475px] mr-8"
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
          <div className="flex flex-col w-[384px] h-[400px] justify-between items-center bg-slate-200">
            <div>{card.name}</div>
            <div className="flex w-44 justify-between">
              <p>type</p>
              {card.types.map((type, index) => {
                return <div key={index}>{type.type.name}</div>;
              })}
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>status</p>
              {card.stats.map((status, index) => {
                return (
                  <div className="flex w-96 justify-between" key={index}>
                    <p>{status.stat.name}</p>

                    <div>
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
                        <div className="w-[10rem] rounded-full bg-gray-700">
                          <div
                            className={`bg-purple-500 h-full rounded-full text-white font-medium p-0.5 text-xs text-center`}
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
            <div>
              <p>ability</p>
              {card.abilities.map((ability, index) => {
                return <div key={index}>{ability.ability.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
