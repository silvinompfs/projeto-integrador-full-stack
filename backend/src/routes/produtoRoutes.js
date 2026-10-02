const express = require("express");

const produtoController = require("../controllers/produtoController");

const router = express.Router();

const associacaoController = require("../controllers/associacaoController");

router.get(
  "/:id/fornecedores",
  associacaoController.listarFornecedoresDoProduto,
);

router.get("/", produtoController.listarProdutos);
router.post("/", produtoController.cadastrarProduto);
router.get("/:id", produtoController.buscarProdutoPorId);
router.put("/:id", produtoController.atualizarProduto);
router.delete("/:id", produtoController.excluirProduto);

module.exports = router;
