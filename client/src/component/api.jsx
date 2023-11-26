import axios from "axios";

export const saveGameResult = async (gameResult) => {
  try {
    await axios.post(
      "https://pokefight-44u6.onrender.com/game/save",
      gameResult
    );
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(
      "https://pokefight-44u6.onrender.com/game/leaderboard"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
