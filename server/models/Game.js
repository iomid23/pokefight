import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    winner: String,
    loser: String,
    turns: Number,
    // Other fields we can add
});

const Game = mongoose.model('Game', gameSchema);

export default Game;