import express from "express";
import { summarizeArticle } from "../controllers/summarizer.controller.js";

const router = express.Router();
router.get("/summarize", (req, res) => {
  res.send("✅ Gemini Summarizer API working");
});
router.post("/summarize", summarizeArticle);

export default router;
