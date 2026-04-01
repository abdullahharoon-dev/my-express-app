import express from "express";
import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database("./history.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});
db.run(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value1 REAL,
    value2 REAL,
    operation TEXT,
    result REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const app = express(); //call  Express like a function and name it "app"
const port = Number(process.env.PORT) || 5000;

app.get("/", (req, res) => {
  //For Get requests to the home URL /, do the following
  //req: info from client (URL, headers, body, etc)
  // res: response sent back (text, HTML, JSON, staus code)
  res.send("Hello World!");
});

app.use(express.json()); //“Hey, whenever someone sends data in JSON format,
// please read and understand it automatically.”
// .use is the middleware first this request will be executed then the follwoing code will be executed

function checkToken(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
app.use(checkToken);

app.post("/add", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const sum = num1 + num2;
  // res.json({ result: sum });
  const operation = "add";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
     VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, sum],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        result: sum,
        message: "Saved to database",
        id: this.lastID,
      });
    },
  );
});

app.post("/subtract", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const subtract = num1 - num2;
  // res.json({ result: subtract });
  const operation = "subtraction";
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
  const operation = "multiplication";
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

app.post("/division", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const division = num1 / num2;
  // res.json({ result: multiply });
  const operation = "division";
  db.run(
    `INSERT INTO history (value1, value2, operation, result)
     VALUES (?, ?, ?, ?)`,
    [num1, num2, operation, division],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        result: division,
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
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
