export const fetchFullContent = async (url) => {
  try {
    const res = await fetch("https://digibarta-backend.onrender.com/api/fetch-full-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    return data.content || "No full content found.";
  } catch (err) {
    console.error("Full article fetch failed:", err);
    return "Error fetching full content.";
  }
};
