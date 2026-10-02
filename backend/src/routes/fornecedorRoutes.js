const express = require("express");

const fornecedorController = require("../controllers/fornecedorController");

const router = express.Router();

const associacaoController = require("../controllers/associacaoController");

router.get("/:id/produtos", associacaoController.listarProdutosDoFornecedor);
router.get("/", fornecedorController.listarFornecedores);
router.post("/", fornecedorController.cadastrarFornecedor);
router.get("/:id", fornecedorController.buscarFornecedorPorId);
router.put("/:id", fornecedorController.atualizarFornecedor);
router.delete("/:id", fornecedorController.excluirFornecedor);

module.exports = router;
