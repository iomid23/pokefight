import { useState, useEffect } from "react";
import { getLeaderboard } from "./api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {leaderboard.map((game, index) => (
          <li key={index} className="mb-2">
            Game {index + 1}: {game.winner} vs {game.looser}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
