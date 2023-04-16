import { React } from "react";
import "../styles/Start.css";
import { Link } from "react-router-dom";

function Start() {
  return (
    <>
      <div className="start">
        <img src="./src/assets/main.jpg" alt="main-img" className="main-img" />
        <div className="order">
          <p>Comanda online</p>
          <button>
            <Link to="/meniu">MENIU</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Start;
