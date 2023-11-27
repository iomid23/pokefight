import { useState, useEffect } from "react";
import axios from "axios";
import { saveGameResult } from "./api";
import Leaderboard from "./Leaderboard";

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

  const handleBattle = async () => {
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
    const gameResult = {
      winner: isWin ? userPokemon.name : randomOpponent.name,
      looser: isWin ? randomOpponent.name : userPokemon.name,
    };

    try {
      await saveGameResult(gameResult);
    } catch (error) {
      console.error("Error saving game result:", error);
    }

    setStartButtonStatus(true);

    setTimeout(() => {
      if (isWin) {
        setResult("Congratulations, you win!");
      } else {
        setResult(`Sorry, ${randomOpponent.name} wins!`);
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
    <div className="h-screen bg-gradient-to-tr from-gray-600 to-gray-300">
      <h1 className="mb-24 flex h-16 items-center justify-center bg-slate-800 text-center text-5xl font-bold text-white">
        Battle Arena
      </h1>
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="cursor-pointer rounded-xl bg-gradient-to-tr from-red-900 to-red-500 duration-300 p-1 ease-in hover:-translate-y-5 hover:drop-shadow-2xl">
          <h1 className="mt-2 flex justify-center text-slate-50">
            {userPokemon.name}
          </h1>
          <img
            className="mx-auto mt-2 flex h-32 w-36 justify-center"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${userPokemon.id}.svg`}
            alt={userPokemon.name}
          />
          <div className="mt-2 flex justify-center space-x-2">
            {userPokemon.types.map((type) => (
              <span
                key={type.slot}
                className={`rounded-lg px-2 py-1 text-white ${getTypeBackgroundColorClass(
                  type.type.name
                )}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
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
          <div className="mt-2 flex justify-center space-x-2">
            {randomOpponent.types.map((type) => (
              <span
                key={type.slot}
                className={`rounded-lg px-2 py-1 text-white ${getTypeBackgroundColorClass(
                  type.type.name
                )}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
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
        <div className="mx-auto my-8 flex h-24 w-1/2 items-center justify-center overflow-hidden rounded-xl bg-slate-800 text-center">
          <h1
            className={`text-xl font-semibold text-white md:text-4xl lg:text-5xl ${
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
