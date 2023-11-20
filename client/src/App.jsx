import React, { useState } from "react";

import Pokedex from "./component/Pokedex";
import Battle from "./component/Battle";
import Header from "./component/Header";
import Footer from "./component/footer";
import Leaderboard from "./component/Leaderboard";
import { saveGameResult } from "./component/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [userPokemon, setUserPokemon] = useState(null);

  const handleSelectPokemon = (selectedPokemon) => {
    setUserPokemon(selectedPokemon);
  };

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Pokedex onSelectPokemon={handleSelectPokemon} />}
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
    </>
  );
}

export default App;
