import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { summarizeArticle } from "../api/summarizer";
import { slugify } from "../../utils/slugify";
import { fetchFullContent } from "../api/fullArticle";

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullText, setFullText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [loadingFullText, setLoadingFullText] = useState(true);
  const summaryRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  // Load article from Storage
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/articles/${id}`);
        if (!res.ok) throw new Error("Article not found");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("❌ Failed to fetch article:", err);
      }
    };

    fetchArticle();
  }, [id]);


  useEffect(() => {
    if (article?.url) {
      setLoadingFullText(true);
      fetchFullContent(article.url).then((data) => {
        setFullText(data);
        setLoadingFullText(false);
      });
    }
  }, [article]);

  const handleSummarize = async () => {
    if (!article) return;

    setLoading(true);
    const contentToSummarize = fullText || article.description || article.content || article.title;
    const summaryText = await summarizeArticle(contentToSummarize, {
      title: article.title,
      source: article.source?.name,
      url: article.url,
      image: article.urlToImage,
      date: article.publishedAt,
    });
    setSummary(summaryText);
    setLoading(false);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };


  if (!article)
    return (
      <div className="text-center mt-20 text-gray-500">
        Article not found.<br />
        Please return to <a href="/" className="text-blue-600 underline">Home</a> and click a news card.
      </div>
    );

  const displayedText = (fullText || article.content || article.description || "").replace(/\n{2,}/g, "\n\n").trim();
  const isLong = displayedText.length > 600;
  const previewText = displayedText.slice(0, 600) + "...";

  return (
    <div className="max-w-4xl mx-auto p-4 mt-4 space-y-6 text-gray-800 dark:text-gray-100">
      <img src={article.urlToImage} alt="cover" className="rounded-lg w-full object-cover max-h-[400px]" />
      <h1 className="text-2xl sm:text-3xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {article.source?.name} • {new Date(article.publishedAt).toLocaleString()}
      </p>

      {loadingFullText ? (
        <div className="animate-pulse text-gray-400">Loading article content...</div>
      ) : (
        <div className="text-lg whitespace-pre-line transition-all duration-500 ease-in-out">
          {showFull ? displayedText : previewText}

          {isLong && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="ml-2 text-blue-500 font-medium hover:underline text-sm"
            >
              {showFull ? "Show Less ▲" : "Show More ▼"}
            </button>
          )}
        </div>
      )}


      <button
        onClick={handleSummarize}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Summarizing..." : "🔍 Summarize with Gemini"}
      </button>

      {summary && (
        <div ref={summaryRef} className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500">
          <h2 className="font-semibold text-blue-600 mb-2">Summary</h2>
          <ul className="list-disc  list-inside  space-y-1">
            {summary
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 3)
              .map((line, idx) => (
                <li className=" w-full" key={idx}>
                  {line.replace(/\*{1,2}/g, "")}
                </li>
              ))}
          </ul>
        </div>
      )}

    </div>
  );
}
