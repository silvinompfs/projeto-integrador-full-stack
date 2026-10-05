const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./estoque.db", (erro) => {
  if (erro) {
    console.error("Erro ao conectar ao banco SQLite:", erro.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

db.run("PRAGMA foreign_keys = ON");

db.run(`
  CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnpj TEXT NOT NULL UNIQUE,
    endereco TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL,
    contato_principal TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    codigo_barras TEXT UNIQUE,
    descricao TEXT NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    categoria TEXT NOT NULL,
    data_validade TEXT,
    imagem TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS produto_fornecedor (
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,

    PRIMARY KEY (produto_id, fornecedor_id),

    FOREIGN KEY (produto_id)
      REFERENCES produtos(id)
      ON DELETE CASCADE,

    FOREIGN KEY (fornecedor_id)
      REFERENCES fornecedores(id)
      ON DELETE CASCADE
  )
`);

module.exports = db;
