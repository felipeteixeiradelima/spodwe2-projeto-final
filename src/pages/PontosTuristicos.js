import React, { useState } from "react";

function PontosTuristicos({ pontos, setPontos }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    cidade: "",
    diasFuncionamento: "",
    horarioDeFuncionamento: "",
    preco: "",
    nota: "",
    site: "",
  });
  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const salvarPonto = (e) => {
    e.preventDefault();
    if (editando) {
      setPontos(pontos.map((p) => (p.id === form.id ? form : p)));
      setEditando(false);
    } else {
      const novoId = pontos.length > 0 ? Math.max(...pontos.map((p) => p.id)) + 1 : 1;
      setPontos([...pontos, { ...form, id: novoId }]);
    }
    setForm({
      id: "",
      nome: "",
      cidade: "",
      diasFuncionamento: "",
      horarioDeFuncionamento: "",
      preco: "",
      nota: "",
      site: "",
    });
  };

  const editarPonto = (ponto) => {
    setForm(ponto);
    setEditando(true);
  };

  const excluirPonto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este ponto turístico?")) {
      setPontos(pontos.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Pontos Turísticos</h2>

      <form onSubmit={salvarPonto} className="crud-form">
        <h3>{editando ? "Editar Ponto Turístico" : "Novo Ponto Turístico"}</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Ponto"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade / Estado"
          value={form.cidade}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="diasFuncionamento"
          placeholder="Dias de Funcionamento"
          value={form.diasFuncionamento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="horarioDeFuncionamento"
          placeholder="Horário de Funcionamento"
          value={form.horarioDeFuncionamento}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço por Pessoa (R$)"
          value={form.preco}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="nota"
          placeholder="Nota"
          value={form.nota}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="site"
          placeholder="URL do Site Oficial (https://...)"
          value={form.site}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editando ? "Atualizar" : "Adicionar"}</button>
        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(false);
              setForm({
                id: "",
                nome: "",
                cidade: "",
                diasFuncionamento: "",
                horarioDeFuncionamento: "",
                preco: "",
                nota: "",
                site: "",
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Dias</th>
            <th>Horário</th>
            <th>Preço (R$)</th>
            <th>Nota</th>
            <th>Website</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td>{ponto.id}</td>
              <td>{ponto.nome}</td>
              <td>{ponto.cidade}</td>
              <td>{ponto.diasFuncionamento}</td>
              <td>{ponto.horarioDeFuncionamento}</td>
              <td>{ponto.preco === 0 || ponto.preco === "0" ? "Gratuito" : ponto.preco}</td>
              <td style={{ minWidth: "50px" }}>⭐ {ponto.nota}</td>
              <td>
                {ponto.site ? (
                  <a
                    href={ponto.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}
                  >
                    Visitar
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td style={{ maxWidth: "125px" }}>
                <button className="btn-editar" onClick={() => editarPonto(ponto)}>
                  Editar
                </button>
                <button className="btn-excluir" onClick={() => excluirPonto(ponto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PontosTuristicos;
