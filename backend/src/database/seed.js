const db = require("./database");

db.serialize(() => {
  db.run(
    `
      INSERT OR IGNORE INTO fornecedores
        (nome, cnpj, endereco, telefone, email, contato_principal)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      "Distribuidora Alfa",
      "12.345.678/0001-95",
      "Rua das Flores, 100",
      "(21) 99999-9999",
      "contato@alfa.com",
      "Carlos",
    ],
  );

  db.run(
    `
      INSERT OR IGNORE INTO produtos
        (nome, codigo_barras, descricao, quantidade, categoria, data_validade, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      "Teclado Mecânico RGB",
      "7890001112223",
      "Teclado mecânico para demonstração do sistema",
      10,
      "Eletrônicos",
      null,
      null,
    ],
  );

  db.get(
    "SELECT id FROM produtos WHERE codigo_barras = ?",
    ["7890001112223"],
    (erroProduto, produto) => {
      if (erroProduto) {
        console.error(
          "Erro ao localizar produto do seed:",
          erroProduto.message,
        );
        return;
      }

      db.get(
        "SELECT id FROM fornecedores WHERE cnpj = ?",
        ["12.345.678/0001-95"],
        (erroFornecedor, fornecedor) => {
          if (erroFornecedor) {
            console.error(
              "Erro ao localizar fornecedor do seed:",
              erroFornecedor.message,
            );
            return;
          }

          if (!produto || !fornecedor) {
            return;
          }

          db.run(
            `
              INSERT OR IGNORE INTO produto_fornecedor
                (produto_id, fornecedor_id)
              VALUES (?, ?)
            `,
            [produto.id, fornecedor.id],
            (erroAssociacao) => {
              if (erroAssociacao) {
                console.error(
                  "Erro ao criar associação do seed:",
                  erroAssociacao.message,
                );
              } else {
                console.log("Dados de demonstração carregados.");
              }
            },
          );
        },
      );
    },
  );
});
