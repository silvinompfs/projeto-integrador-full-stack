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
    <div className="page-card">
      <h2>Associação de Fornecedor a Produto</h2>

      <div className="association-form">
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

        <button className="btn-primary" onClick={handleAssociar}>
          Associar Fornecedor
        </button>
      </div>

      {produtoSelecionado && (
        <div className="product-details">
          <h3>Detalhes do produto</h3>

          <p>
            <strong>Nome:</strong> {produtoSelecionado.nome}
          </p>

          <p>
            <strong>Código de barras:</strong>{" "}
            {produtoSelecionado.codigo_barras}
          </p>

          <p>
            <strong>Descrição:</strong> {produtoSelecionado.descricao}
          </p>

          {produtoSelecionado.imagem && (
            <p>
              <strong>Imagem:</strong> {produtoSelecionado.imagem}
            </p>
          )}
        </div>
      )}

      <hr />

      <div className="association-grid">
        <div className="association-section">
          <h3>Fornecedores associados ao produto</h3>

          {!produtoId ? (
            <p>Selecione um produto para consultar os fornecedores.</p>
          ) : fornecedoresAssociados.length === 0 ? (
            <p>Nenhum fornecedor associado a este produto.</p>
          ) : (
            fornecedoresAssociados.map((fornecedor) => (
              <div key={fornecedor.id} className="item-card">
                <h4>{fornecedor.nome}</h4>

                <p>CNPJ: {fornecedor.cnpj}</p>

                <button
                  className="btn-delete"
                  onClick={() => handleDesassociar(fornecedor.id)}
                >
                  Desassociar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="association-section">
          <h3>Produtos associados ao fornecedor</h3>

          {!fornecedorId ? (
            <p>Selecione um fornecedor para consultar os produtos.</p>
          ) : produtosAssociados.length === 0 ? (
            <p>Nenhum produto associado a este fornecedor.</p>
          ) : (
            produtosAssociados.map((produto) => (
              <div key={produto.id} className="item-card">
                <h4>{produto.nome}</h4>

                <p>Código de barras: {produto.codigo_barras}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Associacoes;
