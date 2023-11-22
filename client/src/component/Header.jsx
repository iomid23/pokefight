import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  const getPokemonData = async () => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (data && data.length > 0) {
      const matchingResults = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term)
      );
      setSearchResults(matchingResults);
    }
  };

  return (
    <header className="bg-red-500 p-4 flex justify-between items-center">
      <h1>
        <a href="/" className="text-white font-bold text-2xl">
          PokeFight
        </a>
      </h1>

      <nav>
        <ul className="flex space-x-4 text-lg">
          {/* Your other navigation items here */}
        </ul>
      </nav>

      <form className="hidden md:block flex-col items-start">
        <input
          className="bg-white text-gray-500 rounded ml-2 px-4 hover:bg-gray-100"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>

      {/* Conditionally render search results */}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.name}>{result.name}</li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
