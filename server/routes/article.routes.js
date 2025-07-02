import express from "express";
import { getArticleBySlug } from "../controllers/article.controller.js";

const router = express.Router();

router.get("/:slug", getArticleBySlug);

export default router;
