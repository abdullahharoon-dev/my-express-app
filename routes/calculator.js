import express from "express";
import History from "../models/history.js";
const router = express.Router();

router.post("/add", async (req, res) => {
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

router.post("/subtract", async (req, res) => {
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

router.post("/multiply", async (req, res) => {
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

router.post("/divide", async (req, res) => {
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

export default router;
