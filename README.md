# Estudos — Docker POC

> POC para validar o funcionamento do Docker com serviços Node.js, Express, Pug e MongoDB.

---

## 🇧🇷 Português (Brasil)

### O que é este projeto?

Este é um projeto de **prova de conceito (POC)** criado para testar o funcionamento do **Docker** com os serviços configurados. O objetivo é validar:

- Orquestração de containers (app Node.js, MongoDB, Mongo Express)
- Build multi-stage do Dockerfile
- Health checks e dependências entre serviços
- Integração de uma página simples usando **Pug** para interação de dados entre cliente e API
- Persistência de dados no **MongoDB**

### Fluxo de dados

A aplicação possui uma página de cadastro de usuários em Pug que:

1. O usuário preenche o formulário (nome e e-mail) no navegador
2. Os dados são enviados via POST para a API (`/users/register`)
3. A API valida, processa e persiste no MongoDB
4. O usuário é redirecionado com feedback de sucesso ou erro

### Quick Start

```bash
# Subir todos os serviços
docker compose up -d

# Acessar
# - App: http://localhost:3000
# - Mongo Express: http://localhost:8081 (admin/pass)
```

### Serviços Docker

| Serviço       | Porta | Descrição                        |
| ------------- | ----- | -------------------------------- |
| app           | 3000  | API Express + página Pug         |
| mongodb       | 27017 | Banco de dados MongoDB           |
| mongo-express | 8081  | Interface web para administração |

### Scripts disponíveis

| Comando            | Descrição                   |
| ------------------ | --------------------------- |
| `npm run dev`      | Desenvolvimento com nodemon |
| `npm test`         | Executar testes             |
| `npm run validate` | Lint + build + testes       |

---

## 🇺🇸 English

### What is this project?

This is a **proof of concept (POC)** project created to test **Docker** functionality with the configured services. The goal is to validate:

- Container orchestration (Node.js app, MongoDB, Mongo Express)
- Multi-stage Dockerfile build
- Health checks and service dependencies
- Integration of a simple page using **Pug** for data interaction between client and API
- Data persistence in **MongoDB**

### Data flow

The application has a user registration page in Pug that:

1. The user fills in the form (name and email) in the browser
2. Data is sent via POST to the API (`/users/register`)
3. The API validates, processes, and persists to MongoDB
4. The user is redirected with success or error feedback

### Quick Start

```bash
# Start all services
docker compose up -d

# Access
# - App: http://localhost:3000
# - Mongo Express: http://localhost:8081 (admin/pass)
```

### Docker Services

| Service       | Port  | Description                      |
| ------------- | ----- | -------------------------------- |
| app           | 3000  | Express API + Pug page           |
| mongodb       | 27017 | MongoDB database                 |
| mongo-express | 8081  | Web interface for administration |

### Available scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Development with nodemon |
| `npm test`         | Run tests                |
| `npm run validate` | Lint + build + tests     |

### Tests created

| Module                  | Test description                                    |
| ----------------------- | --------------------------------------------------- |
| **UsersRepository**     | Returns true when User.create succeeds              |
| **UsersRepository**     | Throws DefaultError 400 on Mongoose ValidationError |
| **UsersRepository**     | Throws DefaultError 409 on duplicate key error      |
| **UsersRepository**     | Throws DefaultError 500 on unknown errors           |
| **registerUsersSchema** | Validates correct data                              |
| **registerUsersSchema** | Normalizes email to lowercase                       |
| **registerUsersSchema** | Rejects empty name                                  |
| **registerUsersSchema** | Rejects invalid email                               |
| **registerUsersSchema** | Rejects when name is missing                        |
| **UsersService**        | Calls repository.save with name and email           |
| **UsersService**        | Propagates error when repository.save fails         |

---

## Stack

- **Node.js** + **Express** — API
- **Pug** — Template engine para páginas
- **MongoDB** + **Mongoose** — Persistência
- **Zod** — Validação
- **Docker** + **Docker Compose** — Contêineres
