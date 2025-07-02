import axios from "axios";
import Article from "../models/article.model.js";

export const fetchNewsByCategory = async (req, res) => {
  const { query = "", category = "general", language = "en", page = 1 } = req.body;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query || category,
        sortBy: "publishedAt",
        language,
        page,
        pageSize: 60,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles;

    const savePromises = articles.map(async (art) => {
      try {
        await Article.create({
          title: art.title,
          content: art.content,
          description: art.description,
          url: art.url,
          urlToImage: art.urlToImage,
          publishedAt: art.publishedAt,
          source: { name: art.source.name },
          category,
        });
      } catch (err) {
        if (err.code === 11000) {
          console.log(`Duplicate article skipped: ${art.title}`);
        } else {
          console.error("Error saving article:", err);
        }
      }
    });

    await Promise.all(savePromises);

    return res.status(200).json({ articles });
  } catch (err) {
    console.error("Backend NewsAPI Error:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
