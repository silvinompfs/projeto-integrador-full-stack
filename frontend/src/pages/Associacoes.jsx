import { useEffect, useState } from "react";
import {
  buscarProdutos,
  buscarFornecedores,
  associarProdutoFornecedor,
  buscarFornecedoresDoProduto,
  buscarProdutosDoFornecedor,
  desassociarProdutoFornecedor,
} from "../services/api";

function Associacoes() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const [produtoId, setProdutoId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  const [fornecedoresAssociados, setFornecedoresAssociados] = useState([]);
  const [produtosAssociados, setProdutosAssociados] = useState([]);

  useEffect(() => {
    buscarProdutos()
      .then((dados) => {
        setProdutos(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });

    buscarFornecedores()
      .then((dados) => {
        setFornecedores(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, []);

  async function handleAssociar() {
    if (!produtoId || !fornecedorId) {
      alert("Selecione um produto e um fornecedor.");
      return;
    }

    try {
      await associarProdutoFornecedor(produtoId, fornecedorId);

      alert("Fornecedor associado com sucesso ao produto!");

      carregarFornecedoresAssociados(produtoId);
      carregarProdutosAssociados(fornecedorId);

    } catch (erro) {
      alert(erro.message);
    }
  }

  function carregarFornecedoresAssociados(idProduto) {
    if (!idProduto) {
      setFornecedoresAssociados([]);
      return;
    }

    buscarFornecedoresDoProduto(idProduto)
      .then((dados) => {
        setFornecedoresAssociados(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  async function handleDesassociar(idFornecedor) {
    const confirmar = window.confirm(
      "Tem certeza que deseja desassociar este fornecedor do produto?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await desassociarProdutoFornecedor(produtoId, idFornecedor);

      alert("Fornecedor desassociado com sucesso!");

      carregarFornecedoresAssociados(produtoId);

      if (fornecedorId) {
        carregarProdutosAssociados(fornecedorId);
      }
    } catch (erro) {
      alert(erro.message);
    }
  }
  const produtoSelecionado = produtos.find(
    (produto) => produto.id === Number(produtoId),
  );

  function carregarProdutosAssociados(idFornecedor) {
    if (!idFornecedor) {
      setProdutosAssociados([]);
      return;
    }

    buscarProdutosDoFornecedor(idFornecedor)
      .then((dados) => {
        setProdutosAssociados(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  return (
    <div>
      <h2>Associações</h2>

      <h3>Associar Produto e Fornecedor</h3>

      <div>
        <label>Produto:</label>
        <select
          value={produtoId}
          onChange={(event) => {
            const id = event.target.value;

            setProdutoId(id);
            carregarFornecedoresAssociados(id);
          }}
        >
          <option value="">Selecione um produto</option>

          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>

        {produtoSelecionado && (
          <div>
            <h4>Detalhes do produto</h4>

            <p>Nome: {produtoSelecionado.nome}</p>
            <p>Código de barras: {produtoSelecionado.codigo_barras}</p>
            <p>Descrição: {produtoSelecionado.descricao}</p>

            {produtoSelecionado.imagem && (
              <p>Imagem: {produtoSelecionado.imagem}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label>Fornecedor:</label>
        <select
          value={fornecedorId}
          onChange={(event) => {
            const id = event.target.value;

            setFornecedorId(id);
            carregarProdutosAssociados(id);
          }}
        >
          <option value="">Selecione um fornecedor</option>

          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.nome}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssociar}>Associar Fornecedor</button>

      <hr />

      <h3>Fornecedores associados ao produto</h3>

      {!produtoId ? (
        <p>Selecione um produto para consultar os fornecedores.</p>
      ) : fornecedoresAssociados.length === 0 ? (
        <p>Nenhum fornecedor associado a este produto.</p>
      ) : (
        fornecedoresAssociados.map((fornecedor) => (
          <div key={fornecedor.id}>
            <p>
              {fornecedor.nome} - {fornecedor.cnpj}
            </p>

            <button onClick={() => handleDesassociar(fornecedor.id)}>
              Desassociar
            </button>
          </div>
        ))
      )}

      <hr />

      <h3>Produtos associados ao fornecedor</h3>

      {!fornecedorId ? (
        <p>Selecione um fornecedor para consultar os produtos.</p>
      ) : produtosAssociados.length === 0 ? (
        <p>Nenhum produto associado a este fornecedor.</p>
      ) : (
        produtosAssociados.map((produto) => (
          <div key={produto.id}>
            <p>
              {produto.nome} - {produto.codigo_barras}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Associacoes;
