import mongoose from "mongoose";

const pokeScoreSchema = new mongoose.Schema({
  winner: String,
  looser: String,
});

const pokefight = mongoose.model("pokefight", pokeScoreSchema); // user wird durch mongoose über MongoDB als userS gespeichert -> user == users; 3 Argument ist der eindeutige Eintrag -> user === user

export default pokefight;