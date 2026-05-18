import React, { useState, useEffect } from "react";

function PontosTuristicos() {
  const [pontos, setPontos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nome: "",
    tipo: "",
    cidade: "",
    precoPorPessoa: "",
  });
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setPontos(dados.pontos);
        setCarregando(false);
      });
  }, []);

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
      const novoId =
        pontos.length > 0 ? Math.max(...pontos.map((p) => p.id)) + 1 : 1;
      setPontos([...pontos, { ...form, id: novoId }]);
    }
    setForm({ id: "", nome: "", tipo: "", cidade: "", precoPorPessoa: "" });
  };

  const editarPonto = (ponto) => {
    setForm(ponto);
    setEditando(true);
  };

  const excluirPonto = (id) => {
    if (
      window.confirm("Tem certeza que deseja excluir este ponto turístico?")
    ) {
      setPontos(pontos.filter((p) => p.id !== id));
    }
  };

  if (carregando) return <p>Carregando pontos turísticos...</p>;

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
          name="tipo"
          placeholder="Tipo (ex: Museu, Igreja)"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precoPorPessoa"
          placeholder="Preço (R$)"
          value={form.precoPorPessoa}
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
                nome: "",
                tipo: "",
                cidade: "",
                precoPorPessoa: "",
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="crud-table">
        <thead className="thead-pontos">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Cidade</th>
            <th>Preço (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.id}>
              <td>{ponto.id}</td>
              <td>{ponto.nome}</td>
              <td>{ponto.tipo}</td>
              <td>{ponto.cidade}</td>
              <td>{ponto.precoPorPessoa}</td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => editarPonto(ponto)}
                >
                  Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirPonto(ponto.id)}
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

export default PontosTuristicos;
