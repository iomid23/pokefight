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
      <Popup
        trigger={<button className="w-14 text-slate-100"> Info </button>}
        modal
        nested
      >
        {(close) => (
          <div className="bg-gradient-to-tr from-red-900 to-red-500 ">
            <div className="flex justify-center ">
              <div className="flex flex-col">
                <h1 className="font-bold flex justify-center p-9 text-5xl text-white">
                  {selectedPokemon.name}
                </h1>
                <div className="flex flex-col items-center self-center md:flex-row md:gap-2 lg:flex-row">
                  <img
                    className="h-30"
                    src={
                      selectedPokemon.sprites.other.dream_world.front_default
                    }
                    alt={selectedPokemon.name}
                  />

                  <div className="flex flex-col space-x-4 justify-center">
                    <h2 className="font-bold text-white text-2xl flex justify-center ">
                      Type:
                    </h2>
                    <div className="flex justify-center space-x-2 mt-2">
                      {selectedPokemon.types.map((type) => (
                        <span
                          key={type.slot}
                          className={`px-2 py-1 rounded-lg text-white 
                        hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300
                         ${getTypeBackgroundColorClass(type.type.name)}`}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-bold text-white text-2xl flex justify-center  pt-4">
                      Abilities:
                    </h2>
                    <div className="flex justify-center space-x-2 mt-2">
                      {selectedPokemon.abilities.map((ability) => (
                        <span
                          key={ability.slot}
                          className="px-2 py-1 rounded-lg text-white bg-blue-500
                                hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                        >
                          {ability.ability.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-white text-2xl flex justify-center pb-4 pt-4">
                    Stats:
                  </h2>
                  <div className="flex flex-col px-4">
                    {selectedPokemon.stats.map((stat) => (
                      <div
                        key={stat.stat.name}
                        className="px-2 py-1 rounded-lg w-full max-w-screen-lg text-white bg-green-700 flex mb-2 justify-between
                                     hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                      >
                        <div>{stat.stat.name}:</div>
                        <div> {stat.base_stat} </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-8">
              <button
                className="bg-red-600 w-36 h-10 text-slate-100 rounded-lg hover:bg-rose-600"
                onClick={() => close()}
              >
                Close{" "}
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
