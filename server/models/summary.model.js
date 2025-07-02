import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  visitorId: String,
  title: { type: String, required: true },
  summary: { type: String, required: true },
  source: String,
  image: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Summary", summarySchema);
