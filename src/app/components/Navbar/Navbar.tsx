import React from "react";

const Navbar = () => {
  return (
    <header className="flex items-center px-8 py-4">
      <div className="text-2xl tracking-wide text-white pr-20">{"{}State"}</div>
      <nav className="space-x-16">
        <a href="#" className="text-white transition-colors">
          Collection
        </a>
        <a href="#" className="text-white transition-colors">
          Portfolio
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
