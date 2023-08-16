import pokefight from "../models/Score.js";

export const getAllScrores = (req, res) => {
  pokefight
    .find()
    .then((allFights) => {
      res.send(allFights);
      console.log(allFights);
    })
    .catch((err) => console.log(err));
};

export const getOneScore = (req, res) => {
  const { id } = req.params;
  pokefight
    .findById(id)
    .then((user) => {
      res.send(user);
      console.log(user);
    })
    .catch((err) => console.log(err));
};

export const createScore = (req, res) => {
  console.log(req.body);
  const { winner, looser } = req.body;

  pokefight
    .create({
      winner: winner,
      looser: looser,
    })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};
