// models/article.model.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    source: {
      name: String,
    },
    category: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 1200,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ title: 1, content: 1 }, { unique: true });

export default mongoose.model("Article", articleSchema);
