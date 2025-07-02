import axios from "axios";
import Summary from "../models/summary.model.js";
export const summarizeArticle = async (req, res) => {
  const { description, visitorId, title, source, image,date } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize the following news content into 5 bullet lines in simple and fluency and just the answer without any heading:\n\n${description}`,
              },
            ],
          },
        ],
      }
    );

    const summary = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!summary) {
      return res.status(500).json({ error: "No summary found." });
    }
    await Summary.create({
      visitorId: visitorId || "anonymous",
      title,
      summary,
      source,
      image,
      date,
    });
    return res.json({ summary });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return res.status(500).json({ error: "Failed to summarize article." });
  }
};
