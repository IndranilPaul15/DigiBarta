export const summarizeArticle = async (content, meta) => {
  const { title, source, url, image, date } = meta;
  const visitorId = localStorage.getItem("visitorId") || "unknown";
  // console.log("visitorid",visitorId)
  try {
    const res = await fetch(
      "http://localhost:5000/api/summarize",
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
