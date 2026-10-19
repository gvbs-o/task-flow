# 🚀 Quick Start - Task Flow

Guia simplificado para iniciantes configurarem o projeto do zero.

---

## 📋 O que você precisa antes de começar

1. **Python 3.11+** instalado
2. **Node.js 18+** instalado
3. **PostgreSQL** instalado e rodando

**Não tem?**
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/windows/

---

## 🔥 Setup em 5 minutos

### Passo 1: PostgreSQL - Criar o Banco

**Via pgAdmin (recomendado):**
1. Abra pgAdmin
2. Clique com botão direito em "Databases"
3. Create → Database
4. Nome: `taskflow`
5. Save

**Ou via terminal:**
```bash
psql -U postgres -c "CREATE DATABASE taskflow;"
```

---

### Passo 2: Backend - Configurar e Rodar

Abra um terminal na pasta `task-flow/`:

```bash
# 1. Criar ambiente virtual
python -m venv venv

# 2. Ativar ambiente virtual
venv\Scripts\activate

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Criar arquivo .env
copy .env.example .env
```

**Edite o arquivo `.env`** e coloque suas credenciais:
```
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/taskflow
```

**Exemplo:**
```
DATABASE_URL=postgresql://postgres:123456@localhost:5432/taskflow
```

```bash
# 5. Criar tabelas no banco (migrations)
alembic upgrade head

# 6. Iniciar backend
uvicorn backend.main:app --reload
```

✅ Backend rodando em: http://localhost:8000

---

### Passo 3: Frontend - Configurar e Rodar

Abra **outro terminal** na pasta `task-flow/`:

```bash
# 1. Entrar na pasta frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar frontend
npm run dev
```

✅ Frontend rodando em: http://localhost:5173

---

## 🎉 Pronto!

Agora você tem:
- ✅ Backend rodando em http://localhost:8000
- ✅ Frontend rodando em http://localhost:5173
- ✅ Banco de dados PostgreSQL configurado

---

## 🤔 O que são essas "migrations"?

**Migrations** = forma de criar/alterar tabelas no banco de forma controlada.

- Você altera o código (models)
- O Alembic gera uma migration
- Você aplica a migration
- O banco é atualizado

**Guia completo:** Veja [alembic-guide.md](alembic-guide.md) para entender melhor.

---

## ⚠️ Erros Comuns

### "psql: command not found"
PostgreSQL não está no PATH. Use pgAdmin para criar o banco.

### "No module named 'sqlalchemy'"
Você não ativou o ambiente virtual. Rode: `venv\Scripts\activate`

### "FATAL: database "taskflow" does not exist"
Você não criou o banco. Veja Passo 1.

### "relation 'tasks' does not exist"
Você não rodou as migrations. Rode: `alembic upgrade head`

---

## 📚 Documentação Adicional

- [README.md](../README.md) - Documentação completa do projeto
- [alembic-guide.md](alembic-guide.md) - Guia detalhado do Alembic
- [Backend docs](../backend/) - Código da API
- [Frontend docs](../frontend/) - Código da interface

---

## 💡 Dicas

- Mantenha **dois terminais abertos**: um para backend, um para frontend
- Sempre que alterar os models, rode `alembic revision --autogenerate -m "descrição"` e depois `alembic upgrade head`
- O backend recarrega automaticamente quando você altera código (`--reload`)
- O frontend também recarrega automaticamente

---

Precisa de ajuda? Veja o [alembic-guide.md](alembic-guide.md) para troubleshooting detalhado.
