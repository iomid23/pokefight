import express from "express";
import {
  getAllScrores,
  getOneScore,
  createScore,
} from "../controllers/pokeController.js";

const scoreRouter = express.Router();

scoreRouter.route("/").get(getAllScrores);
scoreRouter.route("/:id").get(getOneScore);

scoreRouter.route("/create").post(createScore);

export default scoreRouter;
