import React from "react";

function Card({ imagem, titulo, subtitulo, texto, destaque }) {
  const imagemFonte =
    imagem ||
    `https://placehold.co/600x400/1A237E/FFFFFF?text=${encodeURIComponent(
      titulo
    )}`;

  return (
    <div className="card">
      <img src={imagemFonte} alt={titulo} className="card-img" />
      <div className="card-content">
        <h4 className="card-title">{titulo}</h4>
        <p className="card-subtitle">{subtitulo}</p>
        <p className="card-text">{texto}</p>
        <p className="card-highlight">{destaque}</p>
      </div>
    </div>
  );
}

export default Card;
