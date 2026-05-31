import React, { useState } from "react";

function Passeios({ passeios, setPasseios }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    descricao: "",
    local: "",
    preco: "",
    duracao: "",
    horarioInicio: "",
    nota: "",
  });
  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const salvarPasseio = (e) => {
    e.preventDefault();
    if (editando) {
      setPasseios(passeios.map((p) => (p.id === form.id ? form : p)));
      setEditando(false);
    } else {
      const novoId = passeios.length > 0 ? Math.max(...passeios.map((p) => p.id)) + 1 : 1;
      setPasseios([...passeios, { ...form, id: novoId }]);
    }
    setForm({
      id: "",
      nome: "",
      local: "",
      preco: "",
      duracao: "",
      horarioInicio: "",
      nota: "",
    });
  };

  const editarPasseio = (passeio) => {
    setForm(passeio);
    setEditando(true);
  };

  const excluirPasseio = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este passeio?")) {
      setPasseios(passeios.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Passeios Turísticos</h2>

      <form onSubmit={salvarPasseio} className="crud-form">
        <h3>{editando ? "Editar Passeio" : "Novo Passeio"}</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Passeio"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="local"
          placeholder="Localização"
          value={form.local}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço por Pessoa (R$)"
          value={form.preco}
          min="0"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duracao"
          placeholder="Duração (horas)"
          value={form.duracao}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="horarioInicio"
          placeholder="Início (ex: 09:00)"
          value={form.horarioInicio}
          onChange={handleChange}
          pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
          maxLength="5"
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
                local: "",
                preco: "",
                duracao: "",
                horarioInicio: "",
                nota: "",
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
            <th>Local</th>
            <th>Preço (R$)</th>
            <th>Duração (h)</th>
            <th>Início</th>
            <th>Nota</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {passeios.map((passeio) => (
            <tr key={passeio.id}>
              <td>{passeio.id}</td>
              <td>{passeio.nome}</td>
              <td>{passeio.local}</td>
              <td style={{ minWidth: "90px" }}>{passeio.preco}</td>
              <td style={{ minWidth: "100px" }}>{passeio.duracao}</td>
              <td>{passeio.horarioInicio}</td>
              <td style={{ minWidth: "50px" }}>⭐ {passeio.nota}</td>
              <td style={{ maxWidth: "110px" }}>
                <button className="btn-editar" onClick={() => editarPasseio(passeio)}>
                  Editar
                </button>
                <button className="btn-excluir" onClick={() => excluirPasseio(passeio.id)}>
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

export default Passeios;
