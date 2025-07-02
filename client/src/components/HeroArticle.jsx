import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
export default function HeroArticle({ article }) {
  const imageUrl = article?.urlToImage || "";
  return (
    <Link
      to={`/article/${slugify(article.title)}`}
      className="relative group overflow-hidden rounded-xl shadow-lg"
    >
      <img src={`https://digibarta-backend.onrender.com/api/proxy-image?url=${encodeURIComponent(imageUrl)}`}
        alt="hero" className="w-full h-93 object-cover group-hover:scale-105 transition-transform"
        onError={(e) => {
          const fallback = "/placeholder.png";
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
      <div className="absolute bottom-0 rounded-br-[50px] rounded-tl-4xl bg-black/66 w-full p-4 text-white">
        <h2 className="text-xl border-l-3 border-t-3 rounded-tl-2xl pl-4 border-red-700 p-1.5 font-bold mb-1 line-clamp-2">{article.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-2">{article.description}</p>
      </div>
    </Link>
  );
}
