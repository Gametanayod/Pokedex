import koraidonLimite from "../assets/1007Koraidon_Dream_6.png";
import koraidonSprint from "../assets/1007Koraidon_Dream_3.png";
import koraidonSwim from "../assets/1007Koraidon_Dream_7.png";
import koraidonGlide from "../assets/1007Koraidon_Dream_4.png";
import miraidonLowpower from "../assets/1008Miraidon_Dream_5.png";
import miraidonDrive from "../assets/1008Miraidon_Dream_4.png";
import miraidonAquatic from "../assets/1008Miraidon_Dream_6.png";
import miraidonGlide from "../assets/1008Miraidon_Dream_3.png";

export default function Popup({ trigger, settrigger, card }) {
  console.log(card);

  return trigger.show ? (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="bg-white w-96 h-96 p-5 rounded shadow-lg relative">
        <img
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
        <button
          onClick={() => settrigger({ show: false })}
          className="absolute top-2 right-2"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
}
