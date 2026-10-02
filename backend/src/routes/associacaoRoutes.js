const express = require("express");

const associacaoController = require("../controllers/associacaoController");

const router = express.Router();

router.post("/", associacaoController.associarFornecedorAoProduto);

router.delete(
  "/:produtoId/:fornecedorId",
  associacaoController.desassociarFornecedorDoProduto
);

module.exports = router;