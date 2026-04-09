import express from "express";
import cors from "cors";

import sequelize from "./db.js";
import History from "./models/history.js";

const app = express(); //call  Express like a function and name it "app"
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json()); //“Hey, whenever someone sends data in JSON format,
app.get("/", (req, res) => {
  //For Get requests to the home URL /, do the following
  //req: info from client (URL, headers, body, etc)
  // res: response sent back (text, HTML, JSON, staus code)
  res.send("Hello World!");
});

// please read and understand it automatically.”
// .use is the middleware first this request will be executed then the follwoing code will be executed
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

app.post("/divide", async (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 / num2;
  try {
    const record = await History.create({
      value1: num1,
      value2: num2,
      operation: "divide",
      result: result,
    });
    res.json({
      result: result,
      message: "Division record successfully added to Database",
      id: record.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/history", async (req, res) => {
  try {
    const data = await History.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({
      count: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
