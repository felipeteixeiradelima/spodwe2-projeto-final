import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Passeios from "./pages/Passeios";
import PontosTuristicos from "./pages/PontosTuristicos";
import Reservas from "./pages/Reservas";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/passeios" element={<Passeios />} />
            <Route path="/pontos" element={<PontosTuristicos />} />
            <Route path="/reservas" element={<Reservas />} />
          </Routes>
        </main>
        <footer className="app-footer">
          Que Passeio! - Todos os direitos reservados &copy;
        </footer>
      </div>
    </Router>
  );
}

export default App;
