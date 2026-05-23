import React, { useState, useEffect } from "react";

function Passeios() {
  const [passeios, setPasseios] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nome: "",
    local: "",
    preco: "",
    duracao: "",
  });
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carregamento dinâmico do JSON
  useEffect(() => {
    fetch("/data.json")
      .then((resposta) => resposta.json())
      .then((dados) => {
        dados.passeios.map((passeios) => {
          passeios.preco = `R$ ${passeios.preco.toFixed(2).replace(".", ",")}`;
          return passeios;
        });
        setPasseios(dados.passeios);
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro ao carregar dados:", erro));
  }, []); // O array vazio garante que o fetch ocorra apenas uma vez

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
      const novoId =
        passeios.length > 0 ? Math.max(...passeios.map((p) => p.id)) + 1 : 1;
      setPasseios([...passeios, { ...form, id: novoId }]);
    }
    setForm({ id: "", nome: "", local: "", preco: "", duracao: "" });
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

  if (carregando) return <p>Carregando passeios...</p>;

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
          placeholder="Local"
          value={form.local}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
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
        <button type="submit">{editando ? "Atualizar" : "Adicionar"}</button>
        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(false);
              setForm({ id: "", nome: "", local: "", preco: "", duracao: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="crud-table">
        <thead className="thead-passeios">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Local</th>
            <th>Preço (R$)</th>
            <th>Duração (h)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {passeios.map((passeio) => (
            <tr key={passeio.id}>
              <td>{passeio.id}</td>
              <td>{passeio.nome}</td>
              <td>{passeio.local}</td>
              <td>{passeio.preco}</td>
              <td>{passeio.duracao}</td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => editarPasseio(passeio)}
                >
                  Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirPasseio(passeio.id)}
                >
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
