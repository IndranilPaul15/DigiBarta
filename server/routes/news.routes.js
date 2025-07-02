import express from "express";
import { fetchNewsByCategory } from "../controllers/news.controller.js";
const router = express.Router();

router.get("/", fetchNewsByCategory);
router.post("/news", fetchNewsByCategory);

export default router;
