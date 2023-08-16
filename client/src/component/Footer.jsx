
function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <p>&copy; 2023 PokeFight. All rights reserved.</p> 
      
      <nav className="text-lg">
        <a href="/about" className="hover:text-gray-400">About</a>
        <a href="/contact" className="hover:text-gray-400">Contact</a>
      </nav>
    </footer>
  );
}

export default Footer;