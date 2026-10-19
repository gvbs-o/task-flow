# 🚀 TaskFlow

Aplicação fullstack moderna para gerenciamento de tarefas com React, FastAPI e PostgreSQL.

**📖 Documentação para iniciantes:** Veja [docs/QUICKSTART.md](docs/QUICKSTART.md) para um guia passo a passo simplificado.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, Vite, Tailwind CSS, Redux Toolkit, TypeScript
- **Backend:** FastAPI, Python 3.11+
- **Banco de Dados:** PostgreSQL & SQLAlchemy (ORM)
- **Migrations:** Alembic

---

## 📌 Arquitetura do Projeto

```text
task-flow/
├── backend/               # Código-fonte da API
│   ├── api/routes/        # Endpoints da aplicação
│   ├── config/            # Variáveis e configurações do sistema
│   ├── db/                # Conexão e Models SQLAlchemy
│   ├── models/            # Schemas Pydantic (validação de dados)
│   ├── repositories/      # Camada de acesso ao banco de dados
│   ├── services/          # Regras de negócio
│   └── main.py            # Entrypoint do servidor FastAPI
│
└── frontend/              # Código-fonte da interface web
    └── src/
        ├── components/    # Componentes reutilizáveis de UI
        ├── hooks/         # Hooks customizados React
        ├── services/      # Integrações de API (fetch)
        ├── store/         # Gerenciamento de estado global (Redux)
        └── types/         # Definições de tipos TypeScript
```

---

## 🔐 Segurança

- **Isolamento do Banco de Dados:** O frontend **nunca** se conecta diretamente ao banco.
- **Variáveis de Ambiente:** Credenciais e URLs sensíveis ficam armazenadas apenas no backend via `.env`.
- **CORS Configurado:** Apenas origens autorizadas podem consumir os recursos da API.

---

## ⚡ Como Executar a Aplicação (Passo a Passo)

### 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Python 3.11+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente (ou via Docker)

---

### 🟢 ETAPA 1: Configurar e Rodar o Backend

Abra um terminal na raiz do projeto (`task-flow/`):

1. **Crie e ative o ambiente virtual do Python:**
   - **Linux / macOS:**
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
   - **Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```

2. **Instale as dependências do Python:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo de exemplo para criar o seu `.env`:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `.env` gerado e ajuste a URL do seu banco de dados, se necessário:
   ```env
   DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/taskflow
   ```

4. **Crie o Banco de Dados no PostgreSQL:**
   Execute o comando abaixo ou crie manualmente o banco com o nome `taskflow`:
   ```bash
   psql -U postgres -c "CREATE DATABASE taskflow;"
   ```

5. **Execute as Migrations:**
   Aplique a estrutura das tabelas no banco de dados:
   ```bash
   alembic upgrade head
   ```

6. **Inicie o servidor Backend:**
   ```bash
   uvicorn backend.main:app --reload
   ```
   > 📍 **Servidor rodando em:** `http://localhost:8000`  
   > 📑 **Documentação Swagger da API:** `http://localhost:8000/docs`

---

### 🔵 ETAPA 2: Configurar e Rodar o Frontend

Abra um **novo terminal** na pasta do projeto:

1. **Acesse a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale os pacotes e dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   > 📍 **Aplicação rodando em:** `http://localhost:5173`

---

## 🔄 Gerenciando Migrations no Banco de Dados

**📚 Guia completo:** Para um tutorial detalhado com exemplos, troubleshooting e fluxo de trabalho, consulte [docs/alembic-guide.md](docs/alembic-guide.md).

Sempre que alterar os modelos SQLAlchemy em `backend/db/`:

1. **Gere uma nova migration:**
   ```bash
   alembic revision --autogenerate -m "descreva a alteracao realizada"
   ```

2. **Aplique as alterações no banco:**
   ```bash
   alembic upgrade head
   ```

---

## 🌐 Principais Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| **GET** | `/api/tasks` | Retorna todas as tarefas salvas |
| **POST** | `/api/tasks` | Cria uma nova tarefa |
| **GET** | `/api/tasks/{id}` | Busca os detalhes de uma tarefa específica |
| **PUT** | `/api/tasks/{id}` | Atualiza uma tarefa existente |
| **DELETE** | `/api/tasks/{id}` | Remove uma tarefa do banco |

---

## 💻 Resumo das Portas Locais

- **API / Backend:** `http://localhost:8000`
- **Interface / Frontend:** `http://localhost:5173`