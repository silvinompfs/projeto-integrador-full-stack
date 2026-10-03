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

export async function atualizarFornecedor(id, fornecedor) {
  const resposta = await fetch(`${API_URL}/fornecedores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fornecedor),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao atualizar fornecedor");
  }

  return dados;
}

export async function excluirFornecedor(id) {
  const resposta = await fetch(`${API_URL}/fornecedores/${id}`, {
    method: "DELETE",
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao excluir fornecedor");
  }

  return dados;
}

export async function associarProdutoFornecedor(produtoId, fornecedorId) {
  const resposta = await fetch(`${API_URL}/associacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      produtoId: Number(produtoId),
      fornecedorId: Number(fornecedorId),
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao associar fornecedor ao produto");
  }

  return dados;
}

export async function buscarFornecedoresDoProduto(produtoId) {
  const resposta = await fetch(`${API_URL}/produtos/${produtoId}/fornecedores`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar fornecedores do produto");
  }

  return resposta.json();
}

export async function desassociarProdutoFornecedor(produtoId, fornecedorId) {
  const resposta = await fetch(
    `${API_URL}/associacoes/${produtoId}/${fornecedorId}`,
    {
      method: "DELETE",
    },
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || "Erro ao desassociar fornecedor do produto",
    );
  }

  return dados;
}

export async function buscarProdutosDoFornecedor(fornecedorId) {
  const resposta = await fetch(
    `${API_URL}/fornecedores/${fornecedorId}/produtos`,
  );

  if (!resposta.ok) {
    throw new Error("Erro ao buscar produtos do fornecedor");
  }

  return resposta.json();
}
