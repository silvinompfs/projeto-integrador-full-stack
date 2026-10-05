import { useEffect, useState } from "react";
import {
  buscarProdutos,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
} from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [erros, setErros] = useState({});

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const [dataValidade, setDataValidade] = useState("");

  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [categoriaOutro, setCategoriaOutro] = useState("");
  const [imagemAtual, setImagemAtual] = useState(null);
  const [imagemInputKey, setImagemInputKey] = useState(0);
  const [imagem, setImagem] = useState(null);

  const categoriasPadrao = [
    "Eletrônicos",
    "Alimentos",
    "Vestuário",
    "Limpeza",
    "Papelaria",
  ];

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

  function handleEditar(produto) {
    setErros({});
    setProdutoEmEdicao(produto.id);

    setNome(produto.nome);
    setCodigoBarras(produto.codigo_barras);
    setDescricao(produto.descricao);
    setQuantidade(produto.quantidade);
    setDataValidade(produto.data_validade || "");

    setImagemAtual(produto.imagem || null);
    setImagem(null);
    setImagemInputKey((valorAtual) => valorAtual + 1);

    if (categoriasPadrao.includes(produto.categoria)) {
      setCategoria(produto.categoria);
      setCategoriaOutro("");
    } else {
      setCategoria("Outro");
      setCategoriaOutro(produto.categoria);
    }
  }

  function validarFormulario() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "O nome do produto é obrigatório.";
    }

    if (!codigoBarras.trim()) {
      novosErros.codigoBarras = "O código de barras é obrigatório.";
    } else if (!/^\d+$/.test(codigoBarras)) {
      novosErros.codigoBarras =
        "O código de barras deve conter apenas números.";
    }

    if (!descricao.trim()) {
      novosErros.descricao = "A descrição é obrigatória.";
    }

    if (Number(quantidade) < 0) {
      novosErros.quantidade = "A quantidade não pode ser negativa.";
    }

    if (!categoria) {
      novosErros.categoria = "Selecione uma categoria.";
    }

    if (categoria === "Outro" && !categoriaOutro.trim()) {
      novosErros.categoriaOutro = "Informe a categoria.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    const categoriaFinal = categoria === "Outro" ? categoriaOutro : categoria;

    const produto = {
      nome,
      codigoBarras,
      descricao,
      quantidade: Number(quantidade),
      categoria: categoriaFinal,
      dataValidade: dataValidade || null,
      imagem: imagem ? imagem.name : imagemAtual,
    };

    try {
      if (produtoEmEdicao) {
        await atualizarProduto(produtoEmEdicao, produto);
        alert("Produto atualizado com sucesso!");
      } else {
        await cadastrarProduto(produto);
        alert("Produto cadastrado com sucesso!");
      }

      setProdutoEmEdicao(null);
      setErros({});

      setNome("");
      setCodigoBarras("");
      setDescricao("");
      setQuantidade(0);
      setCategoria("");
      setCategoriaOutro("");
      setDataValidade("");

      setImagem(null);
      setImagemAtual(null);
      setImagemInputKey((valorAtual) => valorAtual + 1);

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
    <div className="page-card">
      <h2>Produtos</h2>

      <h3>{produtoEmEdicao ? "Editar Produto" : "Cadastrar Produto"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          {erros.nome && <p>{erros.nome}</p>}
        </div>

        <div>
          <label>Código de barras:</label>
          <input
            value={codigoBarras}
            onChange={(event) => setCodigoBarras(event.target.value)}
          />
          {erros.codigoBarras && <p>{erros.codigoBarras}</p>}
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Descreva brevemente o produto"
          />
          {erros.descricao && <p>{erros.descricao}</p>}
        </div>

        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
          />
          {erros.quantidade && <p>{erros.quantidade}</p>}
        </div>

        <div>
          <label>Categoria:</label>

          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Vestuário">Vestuário</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Papelaria">Papelaria</option>
            <option value="Outro">Outro</option>
          </select>
          {erros.categoria && <p>{erros.categoria}</p>}

          {categoria === "Outro" && (
            <div>
              <label>Outra categoria:</label>
              <input
                value={categoriaOutro}
                onChange={(event) => setCategoriaOutro(event.target.value)}
                placeholder="Informe a categoria"
              />
              {erros.categoriaOutro && <p>{erros.categoriaOutro}</p>}
            </div>
          )}
        </div>
        <div>
          <label>Data de validade:</label>

          <input
            type="date"
            value={dataValidade}
            onChange={(event) => setDataValidade(event.target.value)}
          />
        </div>
        <div>
          <label>Imagem do produto:</label>

          <input
            key={imagemInputKey}
            type="file"
            accept="image/*"
            onChange={(event) => setImagem(event.target.files[0])}
          />

          {imagemAtual && produtoEmEdicao && (
            <p className="info-text">Imagem atual: {imagemAtual}</p>
          )}
        </div>

        <button className="btn-primary" type="submit">
          {produtoEmEdicao ? "Salvar alterações" : "Cadastrar"}
        </button>
      </form>

      <hr />

      <h3>Produtos cadastrados</h3>

      {produtos.map((produto) => (
        <div key={produto.id} className="item-card">
          <h4>{produto.nome}</h4>
          <p>Código de barras: {produto.codigo_barras}</p>
          <p>Quantidade: {produto.quantidade}</p>
          <p>Categoria: {produto.categoria}</p>

          <div className="item-actions">
            <button className="btn-edit" onClick={() => handleEditar(produto)}>
              Editar
            </button>

            <button
              className="btn-delete"
              onClick={() => handleExcluir(produto.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Produtos;
