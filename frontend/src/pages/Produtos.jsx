import { useEffect, useState } from "react";
import {
  buscarProdutos,
  cadastrarProduto,
  excluirProduto,
} from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [categoria, setCategoria] = useState("");

  function carregarProdutos() {
    buscarProdutos()
      .then((dados) => {
        setProdutos(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const produto = {
      nome,
      codigoBarras,
      descricao,
      quantidade: Number(quantidade),
      categoria,
      dataValidade: null,
      imagem: null,
    };

    try {
      await cadastrarProduto(produto);

      alert("Produto cadastrado com sucesso!");

      setNome("");
      setCodigoBarras("");
      setDescricao("");
      setQuantidade(0);
      setCategoria("");

      carregarProdutos();
    } catch (erro) {
      alert(erro.message);
    }
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirProduto(id);

      alert("Produto excluído com sucesso!");

      carregarProdutos();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <div>
      <h2>Produtos</h2>

      <h3>Cadastrar Produto</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label>Código de barras:</label>
          <input
            value={codigoBarras}
            onChange={(event) => setCodigoBarras(event.target.value)}
          />
        </div>

        <div>
          <label>Descrição:</label>
          <input
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
          />
        </div>

        <div>
          <label>Categoria:</label>
          <input
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <h3>Produtos cadastrados</h3>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <h4>{produto.nome}</h4>
          <p>Código de barras: {produto.codigo_barras}</p>
          <p>Quantidade: {produto.quantidade}</p>
          <p>Categoria: {produto.categoria}</p>

          <button onClick={() => handleExcluir(produto.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Produtos;
