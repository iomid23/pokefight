import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

router.post('/game/save', async (req, res) => {
    try {
        const {
            winner,
            loser,
            turns
        } = req.body;
        const game = new Game({
            winner,
            loser,
            turns
        });
        await game.save();
        res.status(201).json({
            message: 'Game saved successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: `Error saving game: ${error.message}`
        });
    }
});

router.get('/game/leaderboard', async (req, res) => {
    try {
        const games = await Game.find().sort({
            turns: -1
        });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({
            error: `Error retrieving leaderboard: ${error.message}`
        });
    }
});

export default router;