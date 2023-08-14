import React, { useState } from "react";
import Pokedex from "./component/Pokedex";
import Battle from "./component/Battle";

function App() {
  const [userPokemon, setUserPokemon] = useState(null);

  const handleSelectPokemon = (selectedPokemon) => {
    setUserPokemon(selectedPokemon);
  };

  return (
    <div>
      {userPokemon ? (
        <Battle userPokemon={userPokemon} />
      ) : (
        <Pokedex onSelectPokemon={handleSelectPokemon} />
      )}
    </div>
  );
}

export default App;
