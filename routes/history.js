import express from "express";
import History from "../models/history.js";
const router = express.Router();

router.get("/history", async (req, res) => {
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

export default router;
