import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-red-500 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl">PokeFight</h1>

      <nav>
        <ul className="flex space-x-4 text-lg">
          <li>
            <a href="/" className="text-white hover:text-gray-200">
              Home
            </a>
          </li>

          <li>
            <a href="/fight" className="text-white hover:text-gray-200">
              Fight
            </a>
          </li>

          <li>
            <a href="/pokedex" className="text-white hover:text-gray-200">
              Pokedex
            </a>
          </li>

          <li>
            <a href="/leaderboard" className="text-white hover:text-gray-200">
              Leaderboard
            </a>
          </li>

          <li>
            <form className="flex items-center">
              <input type="text" className="bg-white rounded px-2 py-1" />
              <button className="bg-white text-gray-500 rounded px-4 hover:bg-gray-100">
                Search
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
