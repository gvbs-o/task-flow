# task-flow

Aplicação fullstack de gerenciamento de tarefas com React, FastAPI e PostgreSQL.

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Redux Toolkit
- **Backend:** FastAPI, Python 3.11+
- **Database:** PostgreSQL com ORM SQLAlchemy
- **Migrations:** Alembic

## Arquitetura

### Backend (FastAPI)
- `backend/main.py` - Entrypoint do FastAPI com CORS e routers
- `backend/config/` - Configurações do sistema
- `backend/db/` - Models SQLAlchemy e conexão com o banco
- `backend/models/` - Schemas Pydantic (request/response)
- `backend/repositories/` - Camada de acesso aos dados
- `backend/services/` - Camada de lógica de negócio
- `backend/api/routes/` - Endpoints da API

### Frontend (React)
- `frontend/src/components/` - Componentes de UI
- `frontend/src/services/` - Chamadas à API (fetch)
- `frontend/src/store/` - Gerenciamento de estado com Redux Toolkit
- `frontend/src/types/` - Tipos TypeScript
- `frontend/src/hooks/` - Hooks customizados

## Segurança

- Credenciais do PostgreSQL são armazenadas apenas nas variáveis de ambiente do backend
- Frontend nunca se conecta diretamente ao banco de dados
- Todo acesso ao banco é feito através da API FastAPI
- CORS está configurado para permitir requisições do frontend

## Configuração

### Pré-requisitos

- Python 3.11+
- Node.js 18+
- PostgreSQL rodando localmente (ou via Docker)

### Configuração do Backend

1. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Copie as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o `.env` e configure sua conexão PostgreSQL:
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
```

5. Crie o banco de dados:
```bash
psql -U postgres -c "CREATE DATABASE taskflow;"
```

6. Execute as migrations:
```bash
alembic upgrade head
```

7. Inicie o backend:
```bash
uvicorn backend.main:app --reload
```

A API estará disponível em `http://localhost:8000`

### Configuração do Frontend

1. Navegue até o diretório frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Migrations do Banco de Dados

Após modificar os models SQLAlchemy, crie uma nova migration:

```bash
alembic revision --autogenerate -m "descrição das alterações"
```

Aplique a migration:

```bash
alembic upgrade head
```

## Endpoints da API

- `GET /api/tasks` - Listar todas as tarefas
- `POST /api/tasks` - Criar uma nova tarefa
- `GET /api/tasks/{id}` - Obter uma tarefa específica
- `PUT /api/tasks/{id}` - Atualizar uma tarefa
- `DELETE /api/tasks/{id}` - Excluir uma tarefa

## Desenvolvimento

- Backend roda na porta 8000
- Frontend roda na porta 5173
- URL base da API: `http://localhost:8000`
