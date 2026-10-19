# Guia Completo do Alembic - Task Flow

Este guia explica como usar o Alembic (ferramenta de migrations) para gerenciar o banco de dados PostgreSQL neste projeto.

---

## 🎯 O que é Alembic?

Alembic é uma ferramenta que controla as alterações no banco de dados. Pense nele como o "Git" para o seu banco de dados:

- **Git** controla versões do código
- **Alembic** controla versões do banco (tabelas, colunas, etc)

---

## 📊 Workflow Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    CICLO DE VIDA DO BANCO                       │
└─────────────────────────────────────────────────────────────────┘

1. CRIAR BANCO (uma única vez)
   └─> psql -U postgres -c "CREATE DATABASE taskflow;"

2. DEFINIR MODEL no código (backend/db/models/)
   └─> class Task(Base):
        titulo = Column(String)
        status = Column(String)

3. GERAR MIGRATION (alembic revision --autogenerate)
   └─> Cria arquivo backend/alembic/versions/20241018_xxxxx.py
       com instruções SQL correspondentes

4. APLICAR MIGRATION (alembic upgrade head)
   └─> Executa SQL no banco e cria/altera tabelas

5. ALTERAR MODEL (quando precisar)
   └─> Volta para passo 3
```

---

## 🚀 Primeira Configuração (Setup Inicial)

### Passo 1: Criar o Banco de Dados

**Opção A - Via pgAdmin (mais fácil):**
1. Abra pgAdmin
2. Clique com botão direito em "Databases"
3. Selecione "Create" → "Database"
4. Nome: `taskflow`
5. Clique em "Save"

**Opção B - Via terminal:**
```bash
psql -U postgres -c "CREATE DATABASE taskflow;"
```

### Passo 2: Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
copy .env.example .env
```

Edite o `.env` com suas credenciais:
```
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/taskflow
```

**Exemplo:**
```
DATABASE_URL=postgresql://postgres:123456@localhost:5432/taskflow
```

### Passo 3: Verificar Models

Os models estão em `backend/db/models/`. No projeto atual temos:

```python
# backend/db/models/task.py
class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### Passo 4: Atualizar env.py (IMPORTANTE!)

O Alembic precisa conhecer todos os models. Verifique `backend/alembic/env.py`:

```python
# Linha 12: Importe TODOS os models aqui
from backend.db.models.task import Task  # ✅ Já existe
# from backend.db.models.user import User  # ← Adicione se criar novo model
```

**Sempre que criar um novo model, adicione o import aqui!**

### Passo 5: Executar Migrations (Criar Tabelas)

```bash
alembic upgrade head
```

Isso vai:
1. Ler todos os models importados em `env.py`
2. Gerar SQL para criar as tabelas
3. Executar no banco `taskflow`

**Resultado:** A tabela `tasks` será criada no PostgreSQL.

---

## 🔄 Uso Cotidiano (Quando Alterar Algo)

### Cenário 1: Adicionar uma nova coluna

**1. Altere o model:**
```python
# backend/db/models/task.py
class Task(Base):
    # ... campos existentes ...
    prioridade = Column(String, default="baixa")  # ← NOVO CAMPO
```

**2. Gere a migration:**
```bash
alembic revision --autogenerate -m "adiciona campo prioridade"
```

Isso cria um arquivo em `backend/alembic/versions/` com nome como:
```
20241018_1430_abc123_adiciona_campo_prioridade.py
```

**3. Verifique o arquivo gerado:**
```python
# backend/alembic/versions/20241018_1430_abc123_adiciona_campo_prioridade.py
def upgrade():
    op.add_column('tasks', sa.Column('prioridade', sa.String(), nullable=True))

def downgrade():
    op.drop_column('tasks', 'prioridade')
```

**4. Aplique a migration:**
```bash
alembic upgrade head
```

✅ Coluna `prioridade` adicionada ao banco!

---

### Cenário 2: Criar um novo model

**1. Crie o novo model:**
```python
# backend/db/models/user.py
from sqlalchemy import Column, String
from backend.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False)
```

**2. Importe no env.py:**
```python
# backend/alembic/env.py
from backend.db.models.task import Task
from backend.db.models.user import User  # ← ADICIONE ESTA LINHA
```

**3. Gere a migration:**
```bash
alembic revision --autogenerate -m "cria tabela users"
```

**4. Aplique:**
```bash
alembic upgrade head
```

✅ Tabela `users` criada!

---

### Cenário 3: Reverter uma migration

Se você aplicou uma migration e quer desfazer:

```bash
alembic downgrade -1
```

Isso volta uma versão. Para voltar ao início (banco vazio):

```bash
alembic downgrade base
```

---

## 📁 Estrutura de Arquivos do Alembic

```
task-flow/
├── alembic.ini                          # Configuração do Alembic
├── backend/
│   ├── alembic/
│   │   ├── env.py                       # Configuração que lê models
│   │   ├── script.py.mako               # Template de migrations
│   │   └── versions/                    # Arquivos de migrations
│   │       ├── __init__.py
│   │       ├── 20241018_1430_abc123_cria_tasks.py
│   │       └── 20241018_1500_def456_adiciona_prioridade.py
│   └── db/
│       └── models/
│           ├── __init__.py
│           └── task.py                  # Seus models SQLAlchemy
```

---

## 🧪 Comandos Úteis

### Ver status das migrations
```bash
alembic current
```
Mostra qual migration está ativa no banco.

### Ver histórico de migrations
```bash
alembic history
```
Lista todas as migrations criadas.

### Ver diferença entre model e banco
```bash
alembic check
```
Verifica se o banco está sincronizado com os models.

### Criar migration sem aplicar
```bash
alembic revision --autogenerate -m "descrição"
```
Gera o arquivo mas não aplica (útil para revisar antes).

---

## ⚠️ Erros Comuns e Soluções

### Erro 1: "Target database is not up to date"

**Causa:** O banco está numa versão antiga das migrations.

**Solução:**
```bash
alembic upgrade head
```

---

### Erro 2: "No changes in schema detected"

**Causa:** Você rodou `--autogenerate` mas não alterou nenhum model.

**Solução:** Altere um model primeiro antes de gerar migration.

---

### Erro 3: "relation 'tasks' already exists"

**Causa:** A tabela já existe (provavelmente criada manualmente).

**Solução:**
```bash
# Opção A: Deixe o Alembic controlar (recomendado)
alembic stamp head  # Marca banco como atual (sem alterar)

# Opção B: Drop da tabela e começa do zero
psql -U postgres -d taskflow -c "DROP TABLE tasks;"
alembic upgrade head
```

---

### Erro 4: ModuleNotFoundError ao rodar migrations

**Causa:** Falta import do model em `env.py`.

**Solução:**
```python
# backend/alembic/env.py
# Adicione o import do model que está faltando
from backend.db.models.seu_model import SeuModel
```

---

### Erro 5: "could not translate foreign name"

**Causa:** URL do banco incorreta no `.env`.

**Solução:** Verifique o arquivo `.env`:
```
DATABASE_URL=postgresql://USUARIO:SENHA@localhost:5432/taskflow
```

Teste a conexão:
```bash
psql -U USUARIO -d taskflow
```

---

## 🎓 Resumo do Fluxo de Trabalho

```
┌─────────────────────────────────────────────────────────────┐
│  SEU FLUXO DIÁRIO DE DESENVOLVIMENTO                       │
└─────────────────────────────────────────────────────────────┘

1. Altere model em backend/db/models/
   ↓
2. (Se for NOVO model) Adicione import em backend/alembic/env.py
   ↓
3. Rode: alembic revision --autogenerate -m "descrição"
   ↓
4. Verifique o arquivo gerado em backend/alembic/versions/
   ↓
5. Rode: alembic upgrade head
   ↓
6. Pronto! Banco atualizado ✅
```

---

## 💡 Dicas de Boas Práticas

1. **Sempre use `--autogenerate`** - O Alembic detecta mudanças automaticamente
2. **Use mensagens descritivas** - `-m "adiciona campo email"` em vez de `-m "x"`
3. **Revise a migration antes de aplicar** - Abra o arquivo e verifique o SQL
4. **Nunca altere migrations antigas** - Crie uma nova migration
5. **Use `downgrade` em desenvolvimento** - Para testar rollback
6. **Version controle as migrations** - Elas vão no Git junto com o código

---

## 🔗 Recursos Adicionais

- Documentação oficial: https://alembic.sqlalchemy.org/
- SQLAlchemy ORM: https://docs.sqlalchemy.org/
- PostgreSQL docs: https://www.postgresql.org/docs/

---

## ❓ Perguntas Frequentes

**Q: Preciso rodar migrations toda vez que inicio o projeto?**
A: Não, apenas quando você altera os models. Na primeira vez, rode `alembic upgrade head` para criar as tabelas.

**Q: O que acontece se eu deletar um arquivo de migration?**
A: O Alembic ficará confuso. Nunca delete migrations manualmente. Se precisar, crie uma nova migration para desfazer a alteração.

**Q: Posso editar o banco manualmente via SQL?**
A: Não recomendado. O Alembic não saberá das alterações. Sempre altere via migrations.

**Q: Como resetar tudo do zero?**
A:
```bash
# Drop do banco
psql -U postgres -c "DROP DATABASE taskflow;"
psql -U postgres -c "CREATE DATABASE taskflow;"

# Delete arquivos de migration manualmente
rm backend/alembic/versions/*.py

# Recrie migrations
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

---

🎉 **Agora você está pronto para usar o Alembic!**
