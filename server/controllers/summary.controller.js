import Summary from "../models/summary.model.js";

// Save a new summary
export const saveSummary = async (req, res) => {
  try {
    const summary = new Summary(req.body);
    const saved = await summary.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save summary." });
  }
};

// Fetch all summaries
export const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summaries." });
  }
};

// Delete a summary
export const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    await Summary.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete summary." });
  }
};
