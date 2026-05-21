import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function Home() {
  const [passeiosDestaque, setPasseiosDestaque] = useState([]);
  const [pontosDestaque, setPontosDestaque] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((resposta) => resposta.json())
      .then((dados) => {
        // Pega apenas os 3 primeiros registros de cada entidade
        setPasseiosDestaque(dados.passeios.slice(0, 3));
        setPontosDestaque(dados.pontos.slice(0, 3));
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro ao carregar dados da Home:", erro));
  }, []);

  if (carregando) return <p>Carregando destaques...</p>;

  return (
    <div>
      <h2>Passeios Turísticos em Destaque</h2>
      <div className="cards-grid">
        {passeiosDestaque.map((passeio) => (
          <Card
            key={passeio.id}
            imagem={
              passeio.imagem
            }
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
            destaque={
              ponto.precoPorPessoa > 0
                ? `R$ ${ponto.precoPorPessoa}`
                : "Gratuito"
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
