import React, { useState, useEffect } from "react";
import PopupGfg from "./PopupGfg";
import { Link } from "react-router-dom";

function Pokedex({
  onSelectPokemon,
  searchResults,
  globalPokemon,
  detailedPokemon,
  matchingResults,
  searchTerm,
}) {
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
  const renderPokemon = (pokemon) => (
    <div
      key={pokemon.id}
      onClick={() => onSelectPokemon(pokemon)}
      className={`rounded-xl w-48 h-64 cursor-pointer ease-in duration-300 
        hover:-translate-y-3 hover:drop-shadow-2xl 
        bg-gradient-to-tr from-red-900 to-red-500`}
    >
      <div
        key={pokemon.id}
        onClick={() => onSelectPokemon(pokemon)}
        className={`rounded-xl w-48 h-64 cursor-pointer ease-in duration-300 
              hover:-translate-y-3 hover:drop-shadow-2xl 
              bg-gradient-to-tr from-red-900 to-red-500`}
      >
        <h1 className="flex justify-center mt-2 text-slate-50">
          {pokemon.name}
        </h1>
        <img
          className="flex justify-center mx-auto mt-4 h-24 w-24"
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
        <div className="flex justify-center space-x-2 pt-4">
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
        <div className="flex justify-center space-x-8 pt-4 mt-2">
          <div
            id="my-prompt"
            className="bg-gradient-to-tr from-rose-900 to-rose-300 rounded-lg border-2"
          >
            <div>
              <PopupGfg selectedPokemon={pokemon} />
            </div>
          </div>
          <div
            id="select"
            className="bg-gradient-to-tr from-rose-900 to-rose-300 rounded-lg border-2"
          >
            <div>
              <Link to="/battle">
                <button className="w-14 text-slate-100">Select</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col grow bg-gradient-to-tr from-gray-600 to-gray-300">
      <h1 className="text-center text-2xl font-bold pt-4">My Pokedex</h1>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-6">
          {searchTerm
            ? searchResults.length > 0
              ? searchResults.map(renderPokemon)
              : matchingResults.length > 0
              ? searchResults.map(renderPokemon)
              : "No Pokemon found"
            : detailedPokemon.map(renderPokemon)}
        </div>
      </section>
    </div>
  );
}

export default Pokedex;
