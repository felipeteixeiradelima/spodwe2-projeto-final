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
      const novoId = reservas.length > 0 ? Math.max(...reservas.map((r) => r.id)) + 1 : 1;
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
          type="emailCliente"
          name="emailCliente"
          placeholder="E-mail do Cliente"
          value={form.emailCliente}
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
        <input type="date" name="data" value={form.data} onChange={handleChange} required />
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

      <table className="crud-table">
        <thead className="thead-reservas">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>E-mail</th>
            <th>Telefone Cliente</th>
            <th>ID Passeio</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nomeCliente}</td>
              <td>{reserva.emailCliente}</td>
              <td>{reserva.telefoneCliente}</td>
              <td>{reserva.passeioId}</td>
              <td>{reserva.data}</td>
              <td style={{ maxWidth: "100px" }}>
                <button className="btn-editar" onClick={() => editarReserva(reserva)}>
                  Editar
                </button>
                <button className="btn-excluir" onClick={() => excluirReserva(reserva.id)}>
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

export default Reservas;
