import React, { useState } from "react";

function Reservas({ reservas, setReservas }) {
  const [form, setForm] = useState({
    id: "",
    nomeCliente: "",
    emailCliente: "",
    telefoneCliente: "",
    passeioId: "",
    data: "",
  });
  const [editando, setEditando] = useState(false);

  const [termoBusca, setTermoBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState({ campo: "", direcao: "asc" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const salvarReserva = (e) => {
    e.preventDefault();
    if (editando) {
      setReservas(reservas.map((r) => (r.id === form.id ? form : r)));
      setEditando(false);
    } else {
      const novoId =
        reservas.length > 0 ? Math.max(...reservas.map((r) => r.id)) + 1 : 1;
      setReservas([...reservas, { ...form, id: novoId }]);
    }
    setForm({
      id: "",
      nomeCliente: "",
      emailCliente: "",
      telefoneCliente: "",
      passeioId: "",
      data: "",
    });
  };

  const editarReserva = (reserva) => {
    setForm(reserva);
    setEditando(true);
  };

  const excluirReserva = (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      setReservas(reservas.filter((r) => r.id !== id));
    }
  };

  const handleOrdenar = (campo) => {
    const direcao =
      ordenacao.campo === campo && ordenacao.direcao === "asc" ? "desc" : "asc";
    setOrdenacao({ campo, direcao });
  };

  let reservasProcessadas = reservas.filter((reserva) => {
    return (
      reserva.nomeCliente.toLowerCase().includes(termoBusca.toLowerCase()) ||
      reserva.emailCliente.toLowerCase().includes(termoBusca.toLowerCase())
    );
  });

  if (ordenacao.campo) {
    reservasProcessadas.sort((a, b) => {
      let valorA = a[ordenacao.campo];
      let valorB = b[ordenacao.campo];

      if (typeof valorA === "string") valorA = valorA.toLowerCase();
      if (typeof valorB === "string") valorB = valorB.toLowerCase();

      if (valorA < valorB) return ordenacao.direcao === "asc" ? -1 : 1;
      if (valorA > valorB) return ordenacao.direcao === "asc" ? 1 : -1;
      return 0;
    });
  }

  const renderIconeOrdenacao = (campo) => {
    if (ordenacao.campo !== campo) return null;
    return ordenacao.direcao === "asc" ? " ▲" : " ▼";
  };

  return (
    <div>
      <h2>Gerenciamento de Reservas</h2>

      <form onSubmit={salvarReserva} className="crud-form">
        <h3>{editando ? "Editar Reserva" : "Nova Reserva"}</h3>
        <input
          type="text"
          name="nomeCliente"
          placeholder="Nome do Cliente"
          value={form.nomeCliente}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefoneCliente"
          placeholder="Telefone do Cliente"
          value={form.telefoneCliente}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="passeioId"
          placeholder="ID do Passeio"
          value={form.passeioId}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
        />
        <input
          type="emailCliente"
          name="emailCliente"
          placeholder="E-mail do Cliente"
          value={form.emailCliente}
          onChange={handleChange}
          required
        />
        <button type="submit">{editando ? "Atualizar" : "Adicionar"}</button>
        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(false);
              setForm({
                id: "",
                nomeCliente: "",
                emailCliente: "",
                telefoneCliente: "",
                passeioId: "",
                data: "",
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="filtros-container">
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou email..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="input-busca"
        />
      </div>

      <table className="crud-table">
        <thead className="thead-reservas">
          <tr>
            <th onClick={() => handleOrdenar("id")}>
              ID {renderIconeOrdenacao("id")}
            </th>
            <th onClick={() => handleOrdenar("nomeCliente")}>
              Cliente {renderIconeOrdenacao("nomeCliente")}
            </th>
            <th onClick={() => handleOrdenar("emailCliente")}>
              E-mail {renderIconeOrdenacao("emailCliente")}
            </th>
            <th onClick={() => handleOrdenar("telefoneCliente")}>
              Telefone Cliente {renderIconeOrdenacao("telefoneCliente")}
            </th>
            <th onClick={() => handleOrdenar("passeioId")}>
              ID Passeio {renderIconeOrdenacao("passeioId")}
            </th>
            <th onClick={() => handleOrdenar("data")}>
              Data {renderIconeOrdenacao("data")}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservasProcessadas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nomeCliente}</td>
              <td>{reserva.emailCliente}</td>
              <td>{reserva.telefoneCliente}</td>
              <td>{reserva.passeioId}</td>
              <td>{reserva.data}</td>
              <td style={{ maxWidth: "100px" }}>
                <button
                  className="btn-editar"
                  onClick={() => editarReserva(reserva)}
                >
                  Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirReserva(reserva.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {reservasProcessadas.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Nenhuma reserva encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;
