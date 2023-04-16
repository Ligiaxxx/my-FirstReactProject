import { useState, React } from "react";
import "../styles/Navigation.css"

import { Link } from "react-router-dom";


function Navigation() {
  return (
    <div className="navigation">
      <nav>
          <Link to="/">
            <img src="./src/assets/logo.png" alt="Logo" />
          </Link>
        <li>
          <Link to="/start">START</Link>
        </li>
        <li>
          <Link to="/meniu">MENIU</Link>
        </li>
        <li>
          <Link to="/recenzii">RECENZII</Link>
        </li>
        <li>
          <Link to="/livrare">LIVRARE</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
        <li>
          <p className="phone-number">Tel: +40 753 555 486</p>
        </li>
      </nav>
    </div>
  );
}

export default Navigation;
