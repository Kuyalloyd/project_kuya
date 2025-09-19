import React from "react";

function Navbar({ setPage }) {
  return (
    <div className="navbar">
      <div>
        <a href="#Home" onClick={() => setPage("Home/Home")}>Home</a>
        <a href="#about" onClick={() => setPage("about")}>About</a>
        <a href="#contact" onClick={() => setPage("contact")}>Contact</a>
      </div>
      <div>
      
      </div>
    </div>
  );
}

export default Navbar;