import express from "express";
import { proxyImage } from "../controllers/proxy.controller.js";

const router = express.Router();
router.get("/proxy-image", proxyImage);
export default router;
