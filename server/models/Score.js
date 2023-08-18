import mongoose from "mongoose";

const pokeScoreSchema = new mongoose.Schema({
  winner: {
    type: String,
    required: true,
  },
  looser: {
    type: String,
    required: true,
  },
});

const pokefight = mongoose.model("pokefight", pokeScoreSchema); // user wird durch mongoose über MongoDB als userS gespeichert -> user == users; 3 Argument ist der eindeutige Eintrag -> user === user

export default pokefight;
