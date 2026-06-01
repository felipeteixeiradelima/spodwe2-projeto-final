import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Passeios from "./pages/Passeios";
import PontosTuristicos from "./pages/PontosTuristicos";
import Reservas from "./pages/Reservas";
import "./App.css";
import formatarDataISO from "./utils";

function App() {
  // Estados globais da aplicação
  const [passeios, setPasseios] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados apenas uma vez quando o App é aberto
  useEffect(() => {
    fetch("/dados.json")
      .then((resposta) => resposta.json())
      .then((dados) => {
        dados.passeios.map((passeios) => {
          passeios.preco = `R$ ${passeios.preco.toFixed(2).replace(".", ",")}`;
          return passeios;
        });
        dados.pontos.map((pontos) => {
          pontos.preco =
            pontos.preco === 0
              ? pontos.preco
              : `R$ ${pontos.preco.toFixed(2).replace(".", ",")}`;
          return pontos;
        });
        dados.reservas.map((reserva) => {
          reserva.data = formatarDataISO(Date.parse(reserva.data), true);
          return reserva;
        });
        setPasseios(dados.passeios);
        setPontos(dados.pontos);
        setReservas(dados.reservas);
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro ao carregar dados globais:", erro));
  }, []);

  if (carregando)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando a aplicação...
      </h2>
    );

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Passando os dados via PROPS para as páginas */}
            <Route
              path="/"
              element={<Home passeios={passeios} pontos={pontos} />}
            />
            <Route
              path="/passeios"
              element={
                <Passeios passeios={passeios} setPasseios={setPasseios} />
              }
            />
            <Route
              path="/pontos"
              element={
                <PontosTuristicos pontos={pontos} setPontos={setPontos} />
              }
            />
            <Route
              path="/reservas"
              element={
                <Reservas reservas={reservas} setReservas={setReservas} />
              }
            />
          </Routes>
        </main>
        <footer className="app-footer">
          Projeto DWE2 - Reserva de Passeios Turísticos
        </footer>
      </div>
    </Router>
  );
}

export default App;
