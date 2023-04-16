import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navigation from "./Pizza/Navigation";
import Start from "./Pizza/Start";
import Meniu from "./Pizza/Meniu";
import Recenzii from "./Pizza/Recenzii";
import Livrare from "./Pizza/Livrare";
import Contact from "./Pizza/Contact";
import Pizza from "./Pizza/Pizza";
import Paste from "./Pizza/Paste";
import MeniuPui from "./Pizza/MeniuPui";
import Burger from "./Pizza/Burger";
import ShoppingList from "./Pizza/ShoppingList";
import Login from "../src/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/meniu" element={<Meniu />} />
        <Route path="/recenzii" element={<Recenzii />} />
        <Route path="/livrare" element={<Livrare />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/pizza" element={<Pizza />} />
        <Route path="/paste" element={<Paste />} />
        <Route path="/meniu-pui" element={<MeniuPui />} />
        <Route path="/burger" element={<Burger />} /> 
        <Route path="/shopping-list" element={<ShoppingList />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
