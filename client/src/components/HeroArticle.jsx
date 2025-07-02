import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
export default function HeroArticle({ article }) {
  const imageUrl = article?.urlToImage || "";
  return (
    <Link
      to={`/article/${slugify(article.title)}`}
      className="relative group overflow-hidden rounded-xl shadow-lg"
    >
      <img src={`http://localhost:5000/api/proxy-image?url=${encodeURIComponent(imageUrl)}`}
        alt="hero" className="w-full h-93 object-cover group-hover:scale-105 transition-transform"
        onError={(e) => {
          const fallback = "public/placeholder.png";
          const cdnProxy = `https://images.weserv.nl/?url=${encodeURIComponent(
            article.urlToImage?.replace("https://", "").replace("http://", "")
          )}`;
          if (!e.target.dataset.triedWeserv) {
            e.target.src = cdnProxy;
            e.target.dataset.triedWeserv = true;
          } else {
            e.target.src = fallback;
          }
        }}
      />
      <div className="absolute bottom-0 bg-black/60 w-full p-4 text-white">
        <h2 className="text-xl font-bold mb-1 line-clamp-2">{article.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-2">{article.description}</p>
      </div>
    </Link>
  );
}
