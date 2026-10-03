import { useEffect, useState } from "react";
import {
  buscarFornecedores,
  cadastrarFornecedor,
  atualizarFornecedor,
  excluirFornecedor,
} from "../services/api";

function Fornecedores() {
  const [erros, setErros] = useState({});
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorEmEdicao, setFornecedorEmEdicao] = useState(null);

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

  function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function formatarCnpj(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 14);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 5) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2)}`;
    }

    if (numeros.length <= 8) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5)}`;
    }

    if (numeros.length <= 12) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5, 8)}/${numeros.slice(8)}`;
    }

    return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5, 8)}/${numeros.slice(8, 12)}-${numeros.slice(12)}`;
  }

  function limparFormulario() {
    setNome("");
    setCnpj("");
    setEndereco("");
    setTelefone("");
    setEmail("");
    setContatoPrincipal("");
    setFornecedorEmEdicao(null);
    setErros({});
  }

  function validarFormulario() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "O nome da empresa é obrigatório.";
    }

    if (!cnpj.trim()) {
      novosErros.cnpj = "O CNPJ é obrigatório.";
    } else if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj)) {
      novosErros.cnpj = "Informe um CNPJ completo.";
    }

    if (!endereco.trim()) {
      novosErros.endereco = "O endereço é obrigatório.";
    }

    if (!telefone.trim()) {
      novosErros.telefone = "O telefone é obrigatório.";
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
      novosErros.telefone = "Informe um telefone completo.";
    }

    if (!email.trim()) {
      novosErros.email = "O e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = "Informe um e-mail válido.";
    }
    if (!contatoPrincipal.trim()) {
      novosErros.contatoPrincipal = "O contato principal é obrigatório.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const fornecedor = {
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      contatoPrincipal,
    };

    try {
      if (fornecedorEmEdicao) {
        await atualizarFornecedor(fornecedorEmEdicao, fornecedor);

        alert("Fornecedor atualizado com sucesso!");
      } else {
        await cadastrarFornecedor(fornecedor);

        alert("Fornecedor cadastrado com sucesso!");
      }

      limparFormulario();
      carregarFornecedores();
    } catch (erro) {
      alert(erro.message);
    }
  }

  function handleEditar(fornecedor) {
    setErros({});
    setFornecedorEmEdicao(fornecedor.id);

    setNome(fornecedor.nome);
    setCnpj(fornecedor.cnpj);
    setEndereco(fornecedor.endereco);
    setTelefone(fornecedor.telefone);
    setEmail(fornecedor.email);
    setContatoPrincipal(fornecedor.contato_principal);
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este fornecedor?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirFornecedor(id);

      alert("Fornecedor excluído com sucesso!");

      carregarFornecedores();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <div>
      <h2>Fornecedores</h2>

      <h3>
        {fornecedorEmEdicao ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nome:</label>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

          {erros.nome && <p>{erros.nome}</p>}
        </div>

        <div>
          <label>CNPJ:</label>
          <input
            value={cnpj}
            onChange={(event) => setCnpj(formatarCnpj(event.target.value))}
            placeholder="00.000.000/0000-00"
          />

          {erros.cnpj && <p>{erros.cnpj}</p>}
        </div>

        <div>
          <label>Endereço:</label>
          <input
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
          />
          {erros.endereco && <p>{erros.endereco}</p>}
        </div>

        <div>
          <label>Telefone:</label>
          <input
            value={telefone}
            onChange={(event) =>
              setTelefone(formatarTelefone(event.target.value))
            }
            placeholder="(00) 00000-0000"
          />
          {erros.telefone && <p>{erros.telefone}</p>}
        </div>

        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {erros.email && <p>{erros.email}</p>}
        </div>

        <div>
          <label>Contato principal:</label>
          <input
            value={contatoPrincipal}
            onChange={(event) => setContatoPrincipal(event.target.value)}
            placeholder="Nome do contato principal"
          />

          {erros.contatoPrincipal && <p>{erros.contatoPrincipal}</p>}
        </div>

        <button type="submit">
          {fornecedorEmEdicao ? "Salvar alterações" : "Cadastrar"}
        </button>
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

          <button onClick={() => handleEditar(fornecedor)}>Editar</button>

          <button onClick={() => handleExcluir(fornecedor.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Fornecedores;
