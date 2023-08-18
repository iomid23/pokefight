import express from "express";
import {
  // getAllScrores,
  // getOneScore,
  // createScore,
  saveGameResult,
  getLeaderboard,
  deleteGameResult,
  deleteAllGameResults,
} from "../controllers/pokeController.js";

const scoreRouter = express.Router();

// scoreRouter.route("/").get(getAllScrores);
// scoreRouter.route("/:id").get(getOneScore);

// scoreRouter.route("/create").post(createScore);

scoreRouter.route("/game/save").post(saveGameResult);
scoreRouter.route("/game/leaderboard").get(getLeaderboard);
scoreRouter.route("/game/:id").delete(deleteGameResult);
scoreRouter.route("/game/delete-all").delete(deleteAllGameResults);

export default scoreRouter;