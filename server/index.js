import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoutes from "./routes/summarizer.routes.js";
import fullArticleRoutes from "./routes/fullArticle.routes.js";
import newsRoutes from "./routes/news.routes.js";
import proxyRoutes from "./routes/proxy.routes.js";
import { connectDB } from "./config/db.js";
import summaryRoutes from "./routes/summary.routes.js";
import articleRoutes from "./routes/article.routes.js";

dotenv.config({ path: ".env.local" });
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api", summarizeRoutes);
app.use("/api", fullArticleRoutes);
app.use("/api", newsRoutes);
app.use("/api", proxyRoutes);
app.use("/api", summaryRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => res.send("✅ Digi Barta Backend Running"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
