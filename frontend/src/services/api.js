const API_URL = "http://localhost:3000";

export async function buscarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return resposta.json();
}

export async function buscarFornecedores() {
  const resposta = await fetch(`${API_URL}/fornecedores`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar fornecedores");
  }

  return resposta.json();
}

export async function cadastrarProduto(produto) {
  const resposta = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao cadastrar produto");
  }

  return dados;
}

export async function cadastrarFornecedor(fornecedor) {
  const resposta = await fetch(`${API_URL}/fornecedores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fornecedor),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao cadastrar fornecedor");
  }

  return dados;
}

export async function atualizarProduto(id, produto) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao atualizar produto");
  }

  return dados;
}

export async function excluirProduto(id) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao excluir produto");
  }

  return dados;
}