const express = require("express");
const cors = require("cors");

const produtoRoutes = require("./src/routes/produtoRoutes");
const fornecedorRoutes = require("./src/routes/fornecedorRoutes");
const associacaoRoutes = require("./src/routes/associacaoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/fornecedores", fornecedorRoutes);
app.use("/associacoes", associacaoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
