import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export const fetchFullArticle = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, { url });

    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    return res.json({
      title: article.title,
      content: article.textContent,
    });
  } catch (error) {
    console.error("Failed to fetch full article:", error.message);
    return res.status(500).json({ error: "Failed to fetch full content." });
  }
};
