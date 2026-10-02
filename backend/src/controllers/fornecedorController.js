const db = require("../database/database");

function validarCnpj(cnpj) {
  const numeros = cnpj.replace(/\D/g, "");

  if (numeros.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(numeros)) {
    return false;
  }

  const calcularDigito = (base, pesos) => {
    let soma = 0;

    for (let i = 0; i < pesos.length; i++) {
      soma += Number(base[i]) * pesos[i];
    }

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(
    numeros,
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  if (primeiroDigito !== Number(numeros[12])) {
    return false;
  }

  const segundoDigito = calcularDigito(
    numeros,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return segundoDigito === Number(numeros[13]);
}

function listarFornecedores(req, res) {
  const sql = `
    SELECT
      id,
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      contato_principal
    FROM fornecedores
    ORDER BY id
  `;

  db.all(sql, [], (erro, fornecedores) => {
    if (erro) {
      console.error("Erro ao listar fornecedores:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao listar fornecedores.",
      });
    }

    return res.status(200).json(fornecedores);
  });
}

function cadastrarFornecedor(req, res) {
  const { nome, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

  if (!nome || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return res.status(400).json({
      mensagem: "E-mail inválido.",
    });
  }

  const formatoCnpjValido = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

  if (!formatoCnpjValido.test(cnpj)) {
    return res.status(400).json({
      mensagem: "CNPJ inválido.",
    });
  }

  if (!validarCnpj(cnpj)) {
    return res.status(400).json({
      mensagem: "CNPJ inválido.",
    });
  }

  const formatoTelefoneValido = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  if (!formatoTelefoneValido.test(telefone)) {
    return res.status(400).json({
      mensagem: "Telefone inválido.",
    });
  }

  const sql = `
    INSERT INTO fornecedores
      (nome, cnpj, endereco, telefone, email, contato_principal)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [nome, cnpj, endereco, telefone, email, contatoPrincipal],
    function (erro) {
      if (erro) {
        console.error("Erro ao cadastrar fornecedor:", erro.message);

        if (erro.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({
            mensagem: "Fornecedor com esse CNPJ já está cadastrado!",
          });
        }

        return res.status(500).json({
          mensagem: "Erro ao cadastrar fornecedor.",
        });
      }

      return res.status(201).json({
        mensagem: "Fornecedor cadastrado com sucesso!",
        id: this.lastID,
      });
    },
  );
}

function buscarFornecedorPorId(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      contato_principal
    FROM fornecedores
    WHERE id = ?
  `;

  db.get(sql, [id], (erro, fornecedor) => {
    if (erro) {
      console.error("Erro ao buscar fornecedor:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao buscar fornecedor.",
      });
    }

    if (!fornecedor) {
      return res.status(404).json({
        mensagem: "Fornecedor não encontrado.",
      });
    }

    return res.status(200).json(fornecedor);
  });
}

function atualizarFornecedor(req, res) {
  const { id } = req.params;

  const { nome, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;

  if (!nome || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email)) {
    return res.status(400).json({
      mensagem: "E-mail inválido.",
    });
  }

  const formatoCnpjValido = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

  if (!formatoCnpjValido.test(cnpj)) {
    return res.status(400).json({
      mensagem: "CNPJ inválido.",
    });
  }

  if (!validarCnpj(cnpj)) {
    return res.status(400).json({
      mensagem: "CNPJ inválido.",
    });
  }

  const formatoTelefoneValido = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  if (!formatoTelefoneValido.test(telefone)) {
    return res.status(400).json({
      mensagem: "Telefone inválido.",
    });
  }

  const sql = `
    UPDATE fornecedores
    SET
      nome = ?,
      cnpj = ?,
      endereco = ?,
      telefone = ?,
      email = ?,
      contato_principal = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [nome, cnpj, endereco, telefone, email, contatoPrincipal, id],
    function (erro) {
      if (erro) {
        console.error("Erro ao atualizar fornecedor:", erro.message);

        if (erro.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({
            mensagem: "Fornecedor com esse CNPJ já está cadastrado!",
          });
        }

        return res.status(500).json({
          mensagem: "Erro ao atualizar fornecedor.",
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          mensagem: "Fornecedor não encontrado.",
        });
      }

      return res.status(200).json({
        mensagem: "Fornecedor atualizado com sucesso!",
      });
    },
  );
}

function excluirFornecedor(req, res) {
  const { id } = req.params;

  const sql = `
    DELETE FROM fornecedores
    WHERE id = ?
  `;

  db.run(sql, [id], function (erro) {
    if (erro) {
      console.error("Erro ao excluir fornecedor:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao excluir fornecedor.",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        mensagem: "Fornecedor não encontrado.",
      });
    }

    return res.status(200).json({
      mensagem: "Fornecedor excluído com sucesso!",
    });
  });
}

module.exports = {
  listarFornecedores,
  cadastrarFornecedor,
  buscarFornecedorPorId,
  atualizarFornecedor,
  excluirFornecedor
};