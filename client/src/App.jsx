import React, { useState } from "react";

import Pokedex from "./component/Pokedex";
import Battle from "./component/Battle";
import Header from "./component/Header";
import Footer from "./component/footer";
import Leaderboard from "./component/Leaderboard";
import { saveGameResult } from "./component/api";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [userPokemon, setUserPokemon] = useState(null);

  const handleSelectPokemon = (selectedPokemon) => {
    setUserPokemon(selectedPokemon);
  };

  return (
    <>
      <Header />

      <div>
        {userPokemon ? (
          <Battle userPokemon={userPokemon} saveGameResult={saveGameResult} />
        ) : (
          <Pokedex onSelectPokemon={handleSelectPokemon} />
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
