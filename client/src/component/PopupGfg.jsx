import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PopupGfg({ selectedPokemon }) {

    const getTypeBackgroundColorClass = (type) => {
        switch (type) {
          case "fire":
            return "bg-red-500";
          case "water":
            return "bg-blue-500";
          case "grass":
            return "bg-green-700";
          case "bug":
            return "bg-green-900";
          case "flying":
            return "bg-sky-600";
          case "poison":
            return "bg-purple-900";
          case "ground":
            return "bg-lime-950";
          case "fairy":
            return "bg-indigo-400";
          case "electric":
            return "bg-yellow-600";
          case "fighting":
            return "bg-stone-800";
          case "psychic":
            return "bg-violet-900";
          default:
            return "bg-gray-500";
        }
      };


  return (
    <div>
      <Popup trigger={<button> Info </button>} modal nested>
        {(close) => (
          <div className="bg-gradient-to-tr from-red-900 to-red-500 ">
            <div className="flex justify-center ">
              <div className="flex flex-col  ">
              <h1 className="font-bold flex justify-center p-9 text-5xl text-white">{selectedPokemon.name}</h1>
              <img className="w-96"
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
              </div>
              
              
              <div id="Das ist der info"
              className="flex justify-center flex-col">

              <h2 className="font-bold text-white text-2xl flex justify-center pb-8">Type:</h2>
                  <div className="flex justify-center space-x-2 mt-2">
                    {selectedPokemon.types.map((type) => (
                        <span key={type.slot}
                        className={`px-2 py-1 rounded-lg text-white ${getTypeBackgroundColorClass(
                          type.type.name )}`}>
                      {type.type.name}
                      </span>
                  ))}
                  </div>
              </div>

            </div>
            <div className="flex justify-center pb-8">
              <button className="bg-red-600 w-36 h-10 text-slate-100 rounded-lg hover:bg-rose-600"
              onClick={() => close()}>Close modal</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
