import Article from "../models/article.model.js"; // create model if not present
import { slugify } from "../utils/slugify.js";     // same slugify used in frontend

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const articles = await Article.find(); // or .find({}) if using filters
    const match = articles.find((a) => slugify(a.title) === slug);

    if (!match) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
