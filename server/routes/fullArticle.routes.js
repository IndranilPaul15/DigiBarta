import express from "express";
import { fetchFullArticle } from "../controllers/fullArticle.controller.js";

const router = express.Router();

router.post("/fetch-full-article", fetchFullArticle);

export default router;
