export const summarizeArticle = async (content, meta) => {
  const { title, source, url, image, date } = meta;
  const visitorId = localStorage.getItem("visitorId") || "unknown";
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  // console.log("visitorid",visitorId)
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/summarize`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: content,
          visitorId,
          title,
          source,
          image,
          url,
          date,
        })
      }
    );
    const data = await res.json();
    return data.summary || "No summary found.";
  } catch (error) {
    console.error("Summarization failed:", error);
    return "Error summarizing article.";
  }
};
