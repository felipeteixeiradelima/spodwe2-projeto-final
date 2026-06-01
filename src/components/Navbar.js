import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src={"./logo.png"} alt="Logo Turismo" className="logo-img" />
        Que Passeio!
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/passeios">Passeios</Link>
        </li>
        <li>
          <Link to="/pontos">Pontos Turísticos</Link>
        </li>
        <li>
          <Link to="/reservas">Reservas</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
