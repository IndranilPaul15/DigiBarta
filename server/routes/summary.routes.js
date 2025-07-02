import express from "express";
import { saveSummary, getSummaries, deleteSummary } from "../controllers/summary.controller.js";

const router = express.Router();

router.post("/summaries", saveSummary);
router.get("/summaries", getSummaries);
router.delete("/summaries/:id", deleteSummary);

export default router;
