const express = require("express");

const produtoRoutes = require("./src/routes/produtoRoutes");
const fornecedorRoutes = require("./src/routes/fornecedorRoutes");
const associacaoRoutes = require("./src/routes/associacaoRoutes");

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/fornecedores", fornecedorRoutes);
app.use("/associacoes", associacaoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
