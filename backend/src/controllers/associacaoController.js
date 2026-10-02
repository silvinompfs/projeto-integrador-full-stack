const db = require("../database/database");

function associarFornecedorAoProduto(req, res) {
  const { produtoId, fornecedorId } = req.body;

  if (!produtoId || !fornecedorId) {
    return res.status(400).json({
      mensagem: "Produto e fornecedor são obrigatórios.",
    });
  }

  const sql = `
    INSERT INTO produto_fornecedor
      (produto_id, fornecedor_id)
    VALUES (?, ?)
  `;

  db.run(sql, [produtoId, fornecedorId], function (erro) {
    if (erro) {
      console.error("Erro ao associar fornecedor ao produto:", erro.message);

      if (erro.code === "SQLITE_CONSTRAINT") {
        return res.status(409).json({
          mensagem: "Fornecedor já está associado a este produto!",
        });
      }

      return res.status(500).json({
        mensagem: "Erro ao associar fornecedor ao produto.",
      });
    }

    return res.status(201).json({
      mensagem: "Fornecedor associado com sucesso ao produto!",
    });
  });
}

function listarFornecedoresDoProduto(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT
      f.id,
      f.nome,
      f.cnpj,
      f.endereco,
      f.telefone,
      f.email,
      f.contato_principal
    FROM fornecedores f
    INNER JOIN produto_fornecedor pf
      ON f.id = pf.fornecedor_id
    WHERE pf.produto_id = ?
    ORDER BY f.nome
  `;

  db.all(sql, [id], (erro, fornecedores) => {
    if (erro) {
      console.error("Erro ao listar fornecedores do produto:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao listar fornecedores do produto.",
      });
    }

    return res.status(200).json(fornecedores);
  });
}

function listarProdutosDoFornecedor(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT
      p.id,
      p.nome,
      p.codigo_barras,
      p.descricao,
      p.quantidade,
      p.categoria,
      p.data_validade,
      p.imagem
    FROM produtos p
    INNER JOIN produto_fornecedor pf
      ON p.id = pf.produto_id
    WHERE pf.fornecedor_id = ?
    ORDER BY p.nome
  `;

  db.all(sql, [id], (erro, produtos) => {
    if (erro) {
      console.error("Erro ao listar produtos do fornecedor:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao listar produtos do fornecedor.",
      });
    }

    return res.status(200).json(produtos);
  });
}

function desassociarFornecedorDoProduto(req, res) {
  const { produtoId, fornecedorId } = req.params;

  const sql = `
    DELETE FROM produto_fornecedor
    WHERE produto_id = ?
      AND fornecedor_id = ?
  `;

  db.run(sql, [produtoId, fornecedorId], function (erro) {
    if (erro) {
      console.error("Erro ao desassociar fornecedor do produto:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao desassociar fornecedor do produto.",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        mensagem: "Associação não encontrada.",
      });
    }

    return res.status(200).json({
      mensagem: "Fornecedor desassociado com sucesso!",
    });
  });
}

module.exports = {
  associarFornecedorAoProduto,
  listarFornecedoresDoProduto,
  listarProdutosDoFornecedor,
  desassociarFornecedorDoProduto,
};