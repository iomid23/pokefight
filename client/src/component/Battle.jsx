import React, { useState, useEffect } from "react";
import axios from "axios";

const Battle = ({ userPokemon }) => {
  const [randomOpponent, setRandomOpponent] = useState(null);
  const [result, setResult] = useState("");
  const [startButtonStatus, setStartButtonStatus] = useState(false);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 649) + 1;
  };

  const fetchPokemonById = async (pokemonId) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      throw error;
    }
  };

  const fetchRandomPokemon = async () => {
    try {
      const randomId = getRandomPokemonId();
      const randomPokemonData = await fetchPokemonById(randomId);
      setRandomOpponent(randomPokemonData);
    } catch (error) {
      console.error("Error fetching random Pokémon data:", error);
      throw error;
    }
  };

  const handleBattle = () => {
    if (!userPokemon || !randomOpponent) {
      return;
    }

    const userAttack =
      userPokemon.stats.find((stat) => stat.stat.name === "attack")
        ?.base_stat || 0;
    const opponentDefense =
      randomOpponent.stats.find((stat) => stat.stat.name === "defense")
        ?.base_stat || 0;

    const attackThreshold = Math.floor(Math.random() * (opponentDefense + 30));
    const isWin = userAttack > attackThreshold;

    setStartButtonStatus(true);

    setTimeout(() => {
      if (isWin) {
        setResult("Congratulations, you win!");
      } else {
        setResult("Sorry, Computer wins!");
      }
    }, 2100);
  };

  const tryAgainHandler = async () => {
    try {
      await fetchRandomPokemon();
      setStartButtonStatus(false);
      setResult("");
    } catch (error) {
      console.error("Error fetching random Pokémon data:", error);
    }
  };

  if (!userPokemon || !randomOpponent) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="h-screen bg-gradient-to-tr from-gray-600 to-gray-300 ">
      <h1 className="mb-24 mt-4 flex h-16 items-center justify-center bg-slate-800 text-center text-5xl font-bold text-white">
        Battle Arena
      </h1>
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="cursor-pointer rounded-xl bg-gradient-to-tr from-red-900 to-red-500 duration-300 ease-in hover:-translate-y-5 hover:drop-shadow-2xl">
          <h1 className="mt-2 flex justify-center text-slate-50">
            {userPokemon.name}
          </h1>
          <img
            className="mx-auto mt-2 flex h-32 w-36 justify-center"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${userPokemon.id}.svg`}
            alt={userPokemon.name}
          />
        </div>
        <div className="cursor-pointer rounded-xl bg-gradient-to-tr from-red-900 to-red-500 duration-300 ease-in hover:-translate-y-5 hover:drop-shadow-2xl">
          <h1 className="mt-2 flex justify-center text-slate-50">
            {randomOpponent.name}
          </h1>
          <img
            className="mx-auto mt-2 flex h-32 w-36 justify-center"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomOpponent.id}.svg`}
            alt={randomOpponent.name}
          />
        </div>
      </div>
      <div className="flex justify-evenly gap-8">
        <button
          className="mt-6 flex w-1/4 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 p-2 px-12 py-6 text-xl text-white shadow-lg shadow-indigo-500/40 hover:bg-red-600"
          onClick={handleBattle}
          disabled={startButtonStatus}
        >
          Start Battle
        </button>
        <button
          className="mt-6 flex w-1/4 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 p-2 px-12 py-6 text-xl text-white shadow-indigo-500/40 hover:bg-blue-700"
          onClick={tryAgainHandler}
        >
          Change Opponent
        </button>
      </div>
      {startButtonStatus && (
        <div className="mt-8 flex items-center justify-center"></div>
      )}
      {result && (
        <div className="mx-auto mt-8 flex h-24 w-1/2 items-center justify-center rounded-xl bg-slate-800">
          <h1
            className={`text-5xl font-semibold text-white ${
              result.includes("Computer wins")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {result}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Battle;
