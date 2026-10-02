import { useState } from "react";
import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Associacoes from "./pages/Associacoes";

function App() {
  const [pagina, setPagina] = useState("produtos");

  return (
    <div>
      <h1>Controle de Estoque</h1>

      <nav>
        <button onClick={() => setPagina("produtos")}>
          Produtos
        </button>

        <button onClick={() => setPagina("fornecedores")}>
          Fornecedores
        </button>

        <button onClick={() => setPagina("associacoes")}>
          Associações
        </button>
      </nav>

      {pagina === "produtos" && <Produtos />}
      {pagina === "fornecedores" && <Fornecedores />}
      {pagina === "associacoes" && <Associacoes />}
    </div>
  );
}

export default App;
