import React, { useState, useEffect } from "react";

import Pokedex from "./component/Pokedex";
import Battle from "./component/Battle";
import Header from "./component/Header";
import Footer from "./component/footer";
import Leaderboard from "./component/Leaderboard";
import { saveGameResult } from "./component/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [userPokemon, setUserPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [matchingResults, setMatchingResults] = useState([]);
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (detailedPokemon && detailedPokemon.length > 0) {
      const matchingResults = detailedPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term)
      );
      setSearchResults(matchingResults);

      if (matchingResults.length === 0) {
        setSearchMessage("Nothing found");
      } else {
        setSearchMessage(""); // Reset the message if there are matching results
      }
    }
  };
  const handleSelectPokemon = (selectedPokemon) => {
    setUserPokemon(selectedPokemon);
  };

  return (
    <div className="flex flex-col grow">
      <Header
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              globalPokemon &&
              detailedPokemon && (
                <Pokedex
                  onSelectPokemon={handleSelectPokemon}
                  searchResults={searchResults}
                  matchingResults={matchingResults}
                  globalPokemon={globalPokemon}
                  detailedPokemon={detailedPokemon}
                  searchTerm={searchTerm}
                />
              )
            }
          />
          <Route
            path="/battle"
            element={
              userPokemon && (
                <Battle
                  userPokemon={userPokemon}
                  saveGameResult={saveGameResult}
                />
              )
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
