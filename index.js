import express from "express";
// import sqlite3 from "sqlite3";
import sequelize from "./db.js";
import History from "./models/history.js";

// const sqlite = sqlite3.verbose();

// const db = new sqlite.Database("./history.db", (err) => {
//   if (err) {
//     console.error("Error opening database:", err.message);
//   } else {
//     console.log("Connected to SQLite database");
//   }
// });
// db.run(`
//   CREATE TABLE IF NOT EXISTS history (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     value1 REAL,
//     value2 REAL,
//     operation TEXT,
//     result REAL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )
// `);

const app = express(); //call  Express like a function and name it "app"
const port = Number(process.env.PORT) || 4000;

app.get("/", (req, res) => {
  //For Get requests to the home URL /, do the following
  //req: info from client (URL, headers, body, etc)
  // res: response sent back (text, HTML, JSON, staus code)
  res.send("Hello World!");
});

app.use(express.json()); //“Hey, whenever someone sends data in JSON format,
// please read and understand it automatically.”
// .use is the middleware first this request will be executed then the follwoing code will be executed

// function checkToken(req, res, next) {
//   if (req.headers.authorization) {
//     next();
//   } else {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// }
// app.use(checkToken);
/*
app.post("/add", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const add = num1 + num2;
  // res.json({ result: sum });
  const operation = "add";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
    VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, add],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        result: add,
        message: "Saved to database",
        id: this.lastID,
      });
    },
  );
});
*/

app.post("/add", async (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 + num2;
  try {
    const record = await History.create({
      value1: num1,
      value2: num2,
      operation: "add",
      result: result,
    });
    res.json({
      result,
      message: "Addition record added to database successfully",
      id: record.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/subtract", async (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 - num2;
  try {
    const record = await History.create({
      value1: num1,
      value2: num2,
      operation: "subtract",
      result: result,
    });
    res.json({
      result,
      message: "Subtraction record successfully added to database",
      id: record.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
app.post("/subtract", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const subtract = num1 - num2;
  // res.json({ result: subtract });
  const operation = "subtract";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
    VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, subtract],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        result: subtract,
        message: "Saved to database",
        id: this.lastID,
      });
    },
  );
});

app.post("/multiply", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const multiply = num1 * num2;
  // res.json({ result: multiply });
  const operation = "multiply";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
    VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, multiply],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        result: multiply,
        message: "Saved to database",
        id: this.lastID,
      });
    },
  );
});
*/

app.post("/multiply", async (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  try {
    const record = await History.create({
      value1: num1,
      value2: num2,
      operation: "multiply",
      result: result,
    });
    res.json({
      result: result,
      message: "Multiplication record successfully added to Database",
      id: record.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/divide", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const divide = num1 / num2;
  // res.json({ result: multiply });
  const operation = "divide";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
     VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, divide],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        result: divide,
        message: "Saved to database",
        id: this.lastID,
      });
    },
  );
});

app.get("/history", (req, res) => {
  db.all(`Select * from history ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      count: rows.length,
      data: rows,
    });
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");
    await sequelize.sync();
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
}

startServer();
