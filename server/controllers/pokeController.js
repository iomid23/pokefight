import pokefight from "../models/Score.js";

// export const getAllScrores = (req, res) => {
//   pokefight
//     .find()
//     .then((allFights) => {
//       res.send(allFights);
//       console.log(allFights);
//     })
//     .catch((err) => console.log(err));
// };

// export const getOneScore = (req, res) => {
//   const {
//     id
//   } = req.params;
//   pokefight
//     .findById(id)
//     .then((user) => {
//       res.send(user);
//       console.log(user);
//     })
//     .catch((err) => console.log(err));
// };

// export const createScore = (req, res) => {
//   console.log(req.body);
//   const {
//     winner,
//     looser
//   } = req.body;

//   pokefight
//     .create({
//       winner: winner,
//       looser: looser,
//     })
//     .then((user) => res.send(user))
//     .catch((err) => console.log(err));
// };

export const saveGameResult = (req, res) => {
  const {
    winner,
    looser,
    turns
  } = req.body;

  pokefight
    .create({
      winner: winner,
      looser: looser,
      turns: turns,
    })
    .then((fight) => res.send(fight))
    .catch((err) => console.log(err));
};

export const getLeaderboard = (req, res) => {
  pokefight
    .find()
    .then((leaderboard) => {
      res.send(leaderboard);
    })
    .catch((err) => console.log(err));
};
export const deleteGameResult = async (req, res) => {
  const gameId = req.params.id;

  try {
    const deletedGame = await pokefight.findByIdAndDelete(gameId);

    if (!deletedGame) {

      return res.status(404).json({
        error: "Game not found."
      });
    }

    res.status(204).send();
  } catch (error) {

    res.status(500).json({
      error: "An error occurred while deleting the game result."
    });
  }
};
export const deleteAllGameResults = async (req, res) => {
  try {

    await pokefight.deleteMany();

    res.status(204).send();
  } catch (error) {

    res.status(500).json({
      error: "An error occurred while deleting all game results."
    });
  }
};