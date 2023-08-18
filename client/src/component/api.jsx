import axios from "axios";

export const saveGameResult = async (gameResult) => {
  try {
    await axios.post("http://localhost:8000/game/save", gameResult);
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get("http://localhost:8000/game/leaderboard");
    return response.data;
  } catch (error) {
    throw error;
  }
};
