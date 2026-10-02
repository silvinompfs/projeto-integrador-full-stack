import { useEffect, useState } from "react";
import { buscarFornecedores, cadastrarFornecedor } from "../services/api";

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [contatoPrincipal, setContatoPrincipal] = useState("");

  function carregarFornecedores() {
    buscarFornecedores()
      .then((dados) => {
        setFornecedores(dados);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const fornecedor = {
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      contatoPrincipal,
    };

    try {
      await cadastrarFornecedor(fornecedor);

      alert("Fornecedor cadastrado com sucesso!");

      setNome("");
      setCnpj("");
      setEndereco("");
      setTelefone("");
      setEmail("");
      setContatoPrincipal("");

      carregarFornecedores();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <div>
      <h2>Fornecedores</h2>

      <h3>Cadastrar Fornecedor</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label>CNPJ:</label>
          <input
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            placeholder="00.000.000/0000-00"
          />
        </div>

        <div>
          <label>Endereço:</label>
          <input
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Contato principal:</label>
          <input
            value={contatoPrincipal}
            onChange={(event) => setContatoPrincipal(event.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <h3>Fornecedores cadastrados</h3>

      {fornecedores.map((fornecedor) => (
        <div key={fornecedor.id}>
          <h4>{fornecedor.nome}</h4>
          <p>CNPJ: {fornecedor.cnpj}</p>
          <p>Telefone: {fornecedor.telefone}</p>
          <p>E-mail: {fornecedor.email}</p>
          <p>Contato: {fornecedor.contato_principal}</p>
        </div>
      ))}
    </div>
  );
}

export default Fornecedores;
