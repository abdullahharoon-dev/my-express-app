# Calculator API

A simple Express + PostgreSQL REST API that performs basic arithmetic operations and stores every calculation in a database. Built as a learning project to explore Node.js, Express, Sequelize, and Postgres.

## Tech Stack

- **Node.js** with ES modules
- **Express 5** — web framework
- **PostgreSQL** — database
- **Sequelize** — ORM for Postgres
- **dotenv** — loads environment variables from `.env`
- **cors** — enables cross-origin requests
- **nodemon** (dev) — auto-restarts the server on file changes

## Project Structure

```
.
├── index.js              # entry point: sets up Express, middleware, DB connection
├── db.js                 # Sequelize Postgres connection (reads from .env)
├── routes/
│   ├── calculator.js     # POST /add, /subtract, /multiply, /divide
│   └── history.js        # GET /history
├── models/
│   └── history.js        # Sequelize model for stored calculations
├── .env.example          # template for required environment variables
├── .gitignore
└── package.json
```

## Prerequisites

- Node.js (v18 or newer recommended)
- PostgreSQL installed and running locally
- A Postgres database created (default name: `calculator_db`) and a Postgres role with access to it

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/my-express-app.git
   cd my-express-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your `.env` file** from the template
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in your local Postgres values.

4. **Make sure your Postgres database exists.** Inside `psql`:
   ```sql
   CREATE DATABASE calculator_db;
   ```

5. **Start the server**
   ```bash
   npm run dev    # with auto-reload (nodemon)
   # or
   npm start      # plain node
   ```

   You should see:
   ```
   Connected to PostgreSQL
   Database synced
   App listening on port 4000
   ```

## Environment Variables

All configuration lives in `.env` (which is gitignored). See `.env.example` for the full list.

| Variable      | Purpose                                  | Example          |
| ------------- | ---------------------------------------- | ---------------- |
| `DB_NAME`     | Postgres database name                   | `calculator_db`  |
| `DB_USER`     | Postgres role to log in as               | `abdullahharoon` |
| `DB_PASSWORD` | Password for that role (empty if none)   |                  |
| `DB_HOST`     | Postgres host                            | `localhost`      |
| `DB_DIALECT`  | Sequelize dialect                        | `postgres`       |
| `PORT`        | Port the API listens on (default `4000`) | `4000`           |

## API Endpoints

The server runs on `http://localhost:4000` by default.

### Health check

`GET /` → `Hello World!`

### Arithmetic operations

All four take a JSON body with two numbers, perform the operation, and persist the result in the `history` table.

| Method | Path        | Body                          | Response                              |
| ------ | ----------- | ----------------------------- | ------------------------------------- |
| POST   | `/add`      | `{ "num1": 5, "num2": 3 }`    | `{ result: 8, message, id }`          |
| POST   | `/subtract` | `{ "num1": 10, "num2": 4 }`   | `{ result: 6, message, id }`          |
| POST   | `/multiply` | `{ "num1": 6, "num2": 7 }`    | `{ result: 42, message, id }`         |
| POST   | `/divide`   | `{ "num1": 20, "num2": 5 }`   | `{ result: 4, message, id }`          |

**Example request** (using `curl`):
```bash
curl -X POST http://localhost:4000/add \
  -H "Content-Type: application/json" \
  -d '{"num1": 5, "num2": 3}'
```

### History

| Method | Path       | Description                                                |
| ------ | ---------- | ---------------------------------------------------------- |
| GET    | `/history` | Returns all past calculations, newest first.               |

**Response shape:**
```json
{
  "count": 2,
  "data": [
    {
      "id": 2,
      "value1": 10,
      "value2": 4,
      "operation": "subtract",
      "result": 6,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```
