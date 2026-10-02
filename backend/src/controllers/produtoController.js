const db = require("../database/database");

function listarProdutos(req, res) {
  const sql = `
    SELECT
      id,
      nome,
      codigo_barras,
      descricao,
      quantidade,
      categoria,
      data_validade,
      imagem
    FROM produtos
    ORDER BY id
  `;

  db.all(sql, [], (erro, produtos) => {
    if (erro) {
      console.error("Erro ao listar produtos:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao listar produtos.",
      });
    }

    return res.status(200).json(produtos);
  });
}

function cadastrarProduto(req, res) {
  const {
    nome,
    codigoBarras,
    descricao,
    quantidade,
    categoria,
    dataValidade,
    imagem,
  } = req.body;

  if (
    !nome ||
    !codigoBarras ||
    !descricao ||
    quantidade === undefined ||
    quantidade === null ||
    !categoria
  ) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    return res.status(400).json({
      mensagem: "Quantidade em estoque inválida.",
    });
  }

  const codigoBarrasValido = /^\d+$/;

  if (!codigoBarrasValido.test(codigoBarras)) {
    return res.status(400).json({
      mensagem: "Código de barras inválido.",
    });
  }

  const sql = `
    INSERT INTO produtos
      (
        nome,
        codigo_barras,
        descricao,
        quantidade,
        categoria,
        data_validade,
        imagem
      )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      nome,
      codigoBarras,
      descricao,
      quantidade,
      categoria,
      dataValidade,
      imagem,
    ],
    function (erro) {
      if (erro) {
        console.error("Erro ao cadastrar produto:", erro.message);

        if (erro.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({
            mensagem: "Produto com este código de barras já está cadastrado!",
          });
        }

        return res.status(500).json({
          mensagem: "Erro ao cadastrar produto.",
        });
      }

      return res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        id: this.lastID,
      });
    },
  );
}

function buscarProdutoPorId(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      nome,
      codigo_barras,
      descricao,
      quantidade,
      categoria,
      data_validade,
      imagem
    FROM produtos
    WHERE id = ?
  `;

  db.get(sql, [id], (erro, produto) => {
    if (erro) {
      console.error("Erro ao buscar produto:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao buscar produto.",
      });
    }

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado.",
      });
    }

    return res.status(200).json(produto);
  });
}

function atualizarProduto(req, res) {
  const { id } = req.params;

  const {
    nome,
    codigoBarras,
    descricao,
    quantidade,
    categoria,
    dataValidade,
    imagem,
  } = req.body;

  if (
    !nome ||
    !codigoBarras ||
    !descricao ||
    quantidade === undefined ||
    quantidade === null ||
    !categoria
  ) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    return res.status(400).json({
      mensagem: "Quantidade em estoque inválida.",
    });
  }

  const codigoBarrasValido = /^\d+$/;

  if (!codigoBarrasValido.test(codigoBarras)) {
    return res.status(400).json({
      mensagem: "Código de barras inválido.",
    });
  }

  const sql = `
    UPDATE produtos
    SET
      nome = ?,
      codigo_barras = ?,
      descricao = ?,
      quantidade = ?,
      categoria = ?,
      data_validade = ?,
      imagem = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      nome,
      codigoBarras,
      descricao,
      quantidade,
      categoria,
      dataValidade,
      imagem,
      id,
    ],
    function (erro) {
      if (erro) {
        console.error("Erro ao atualizar produto:", erro.message);

        if (erro.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({
            mensagem: "Produto com este código de barras já está cadastrado!",
          });
        }

        return res.status(500).json({
          mensagem: "Erro ao atualizar produto.",
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          mensagem: "Produto não encontrado.",
        });
      }

      return res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
      });
    },
  );
}

function excluirProduto(req, res) {
  const { id } = req.params;

  const sql = `
    DELETE FROM produtos
    WHERE id = ?
  `;

  db.run(sql, [id], function (erro) {
    if (erro) {
      console.error("Erro ao excluir produto:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao excluir produto.",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado.",
      });
    }

    return res.status(200).json({
      mensagem: "Produto excluído com sucesso!",
    });
  });
}

module.exports = {
  listarProdutos,
  cadastrarProduto,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto,
};
