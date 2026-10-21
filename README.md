# Sistema - Clientes, Categorias e Fornecedores

Node.js + Express + MVC + EJS + Firebase. Telas web e API REST (JSON).

## Rodar no computador
1. `npm install`
2. Coloque sua chave do Firebase em `config/serviceAccountKey.json`
   (modelo: `config/serviceAccountKey-exemplo.json`). Esse arquivo NÃO vai para o GitHub.
3. `npm start` e abra http://localhost:3000

## Telas
`/clientes`, `/categorias`, `/fornecedores`

## API REST
| Método | Rota | Ação |
|---|---|---|
| GET | /api/clientes | Listar |
| GET | /api/clientes/:id | Consultar |
| POST | /api/clientes | Cadastrar |
| PUT | /api/clientes/:id | Alterar |
| DELETE | /api/clientes/:id | Excluir |

O mesmo vale para `/api/categorias` e `/api/fornecedores`.
Corpo JSON: clientes `{nome, email}`, categorias `{nome}`, fornecedores `{nome, cnpj}`.

## Deploy no Render
- Build Command: `npm install`
- Start Command: `npm start`
- Variável de ambiente `FIREBASE_SERVICE_ACCOUNT`: cole o conteúdo inteiro do JSON da chave.
