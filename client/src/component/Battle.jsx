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

    const userAttack = userPokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0;
    const opponentDefense = randomOpponent.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0;

    const attackThreshold = Math.floor(Math.random() * (opponentDefense + 30));
    const isWin = userAttack > attackThreshold;

    setStartButtonStatus(true);

    setTimeout(() => {
      if (isWin) {
        setResult("Congratulations, you win!");
        saveBattleResult(userPokemon.name, randomOpponent.name);
      } else {
        setResult("Sorry, Computer wins!");
        saveBattleResult(randomOpponent.name, userPokemon.name);
      }
    }, 2100);
  };

  const saveBattleResult = async (winner, loser) => {
    try {
      // Replace this with actual API endpoint for saving battle results
      const response = await axios.post(
        "URL",
        { winner, loser }
      );

      console.log("Battle result saved:", response.data);
    } catch (error) {
      console.error("Error saving battle result:", error);
    }
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
    <>
      <div className="bg-gradient-to-tr from-gray-600 to-gray-300 h-screen">
        <h1 className="text-center text-2xl font-bold mt-4">Battle Arena</h1>
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="rounded-xl cursor-pointer ease-in duration-300 hover:-translate-y-5 hover:drop-shadow-2xl bg-gradient-to-tr from-red-900 to-red-500">
            <h1 className="flex justify-center mt-2 text-slate-50">{userPokemon.name}</h1>
            <img
              className="flex justify-center w-36 h-32 mx-auto mt-2"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${userPokemon.id}.svg`}
              alt={userPokemon.name}
            />
          </div>
          <div className="rounded-xl cursor-pointer ease-in duration-300 hover:-translate-y-5 hover:drop-shadow-2xl bg-gradient-to-tr from-red-900 to-red-500">
            <h1 className="flex justify-center mt-2 text-slate-50">{randomOpponent.name}</h1>
            <img
              className="flex justify-center w-36 h-32 mx-auto mt-2"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomOpponent.id}.svg`}
              alt={randomOpponent.name}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-6 rounded-3xl bg-red-500 p-2 px-12 py-6 text-xl text-white shadow-lg shadow-indigo-500/40"
            onClick={handleBattle}
            disabled={startButtonStatus}
          >
            Start Battle
          </button>
          <button
            className="text-gray mt-6 flex items-center gap-2 p-2 px-12 py-6 text-xl dark:text-white"
            onClick={tryAgainHandler}
          >
            Change opponent
          </button>
        </div>
        {startButtonStatus && (
          <div className="mt-8 flex justify-center">
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <h1 className="text-5xl font-semibold dark:text-yellow-300 ">{result}</h1>
        </div>
      </div>
    </>
  );
};

export default Battle;
