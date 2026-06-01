import React from "react";
import Card from "../components/Card";

function Home({ passeios, pontos }) {
  const passeiosDestaque = passeios.slice(0, 3);
  const pontosDestaque = pontos.slice(0, 3);

  return (
    <div>
      <h2>Passeios Turísticos em Destaque</h2>
      <div className="cards-grid">
        {passeiosDestaque.map((passeio) => (
          <Card
            key={passeio.id}
            imagem={passeio.imagem}
            titulo={passeio.nome}
            subtitulo={passeio.local}
            texto={`Duração de ${passeio.duracao} horas.`}
            destaque={`R$ ${passeio.preco}`}
          />
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Principais Pontos Turísticos</h2>
      <div className="cards-grid">
        {pontosDestaque.map((ponto) => (
          <Card
            key={ponto.id}
            imagem={ponto.imagem}
            titulo={ponto.nome}
            subtitulo={ponto.tipo}
            texto={ponto.cidade}
            destaque={ponto.preco > 0 ? `R$ ${ponto.preco}` : "Gratuito"}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
