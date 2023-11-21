import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-red-500 p-4 flex justify-between items-center">
      <h1>
        <a href="/" className="text-white font-bold text-2xl">
          PokeFight
        </a>
      </h1>

      <nav>
        <ul className="flex space-x-4 text-lg">
          {/* <li>
            <a href="/pokedex" className="text-white hover:text-gray-200">
              Pokedex
            </a>
          </li> */}

          <li>
            <a href="/leaderboard" className="text-white hover:text-gray-200">
              Leaderboard
            </a>
          </li>

          <li>
            <form className="hidden md:block flex-col items-start">
              <input type="text" className="bg-white rounded px-2 py-1" />
              <button className="bg-white text-gray-500 rounded ml-2 px-4 hover:bg-gray-100">
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
