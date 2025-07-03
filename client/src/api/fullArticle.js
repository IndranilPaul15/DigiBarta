const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const fetchFullContent = async (url) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/fetch-full-article`, {
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
