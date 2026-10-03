# Sistema de Controle de Estoque

FACULDADE GRAN  
Projeto Disciplina Projeto Integrador

## Sobre o projeto

Este projeto foi desenvolvido como parte da disciplina Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas da Faculdade GRAN.

O objetivo é construir uma aplicação Full Stack para controle de estoque, permitindo o gerenciamento de produtos, fornecedores e associações entre produtos e fornecedores.

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- SQLite
- CORS

### Frontend

- React
- Vite
- JavaScript

### Ferramentas

- Visual Studio Code
- Git
- GitHub
- Insomnia

## Funcionalidades

### Produtos

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Validação de campos obrigatórios
- Validação de código de barras
- Categoria pré-definida
- Categoria personalizada com opção "Outro"
- Data de validade opcional
- Referência de imagem do produto

### Fornecedores

- Cadastro de fornecedores
- Listagem de fornecedores
- Edição de fornecedores
- Exclusão de fornecedores
- Validação de CNPJ
- Máscara de CNPJ
- Validação e máscara de telefone
- Validação de e-mail
- Validação dos campos obrigatórios

### Associação Produto / Fornecedor

- Associação de fornecedores a produtos
- Bloqueio de associações duplicadas
- Listagem dos fornecedores associados a um produto
- Listagem dos produtos associados a um fornecedor
- Desassociação entre produto e fornecedor

```md
## Estrutura do projeto

```text
projeto-integrador-full-stack/
├── backend/
│   ├── app.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   └── routes/
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## Como executar o projeto
- Backend:<br>
Entre na pasta:
cd backend

Instale as dependências:
npm install

Inicie o servidor:
npm start

O backend será executado em:
http://localhost:3000

- Frontend:<br>
Em outro terminal, entre na pasta:
cd frontend

Instale as dependências:
npm install

Inicie o frontend:
npm run dev

A aplicação será disponibilizada em:
http://localhost:5173

## Banco de dados
O projeto utiliza SQLite.
O arquivo estoque.db é criado localmente pelo backend e não é enviado ao repositório Git.

## Versionamento
O projeto utiliza Git e GitHub para controle de versão.

## Autor
Marcos Silvino

## Instituição
FACULDADE GRAN<br><br>
Curso de Análise e Desenvolvimento de Sistemas<br>
Disciplina: Projeto Integrador
