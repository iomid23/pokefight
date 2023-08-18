import React, { useState, useEffect } from "react";
import PopupGfg from "./PopupGfg";

function Pokedex({ onSelectPokemon }) {
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [detailedPokemon, setDetailedPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setGlobalPokemon(data.results);
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        Promise.all(promises)
          .then((detailedData) => {
            setDetailedPokemon(detailedData);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    
    <div className="bg-gradient-to-tr from-gray-600 to-gray-300">
      <h1 className="text-center text-2xl font-bold pt-4">My Pokedex</h1>
      <section className="flex justify-center">
        <div className="grid grid-cols-5 gap-4 p-6">
          {detailedPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => onSelectPokemon(pokemon)}
              className={`rounded-xl w-48 h-64 cursor-pointer ease-in duration-300 
              hover:-translate-y-5 hover:drop-shadow-2xl 
              bg-gradient-to-tr from-red-900 to-red-500`}
            >
              <h1 className="flex justify-center mt-2 text-slate-50">
                {pokemon.name}
              </h1>
              <img
                className="flex justify-center w-36 h-32 mx-auto mt-2"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <div className="flex justify-center space-x-2 mt-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.slot}
                    className={`px-2 py-1 rounded-lg text-white ${getTypeBackgroundColorClass(
                      type.type.name
                    )}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className=" flex justify-center space-x-8 mt-2">
                <div
                  id="my promp"
                  className="bg-gradient-to-tr from-rose-900 to-rose-300 rounded-lg border-2 "
                >
                  <button className="w-14 text-slate-100 hover:bg-rose-600 hover:border-4">
                  <PopupGfg selectedPokemon={pokemon} />

                  </button>
                </div>
                <div
                  id="select"
                  className="bg-gradient-to-tr from-rose-900 to-rose-300  rounded-lg border-2"
                >
                  <button className="w-14 text-slate-100  hover:bg-rose-600 hover:border-4 ">Select</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Pokedex;
