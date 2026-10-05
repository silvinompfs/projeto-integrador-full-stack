import { useState } from "react";
import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Associacoes from "./pages/Associacoes";

function App() {
  const [pagina, setPagina] = useState("produtos");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Controle de Estoque</h1>

        <nav className="menu">
          <button
            className={pagina === "produtos" ? "active" : ""}
            onClick={() => setPagina("produtos")}
          >
            Produtos
          </button>

          <button
            className={pagina === "fornecedores" ? "active" : ""}
            onClick={() => setPagina("fornecedores")}
          >
            Fornecedores
          </button>

          <button
            className={pagina === "associacoes" ? "active" : ""}
            onClick={() => setPagina("associacoes")}
          >
            Associações
          </button>
        </nav>
      </header>

      {pagina === "produtos" && <Produtos />}
      {pagina === "fornecedores" && <Fornecedores />}
      {pagina === "associacoes" && <Associacoes />}
    </div>
  );
}

export default App;
