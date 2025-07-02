import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
export default function ArticleCard({ article, small = false }) {
  const imageUrl = article?.urlToImage || "";
  return (
    <Link
      to={`/article/${slugify(article.title)}`}
      className={`group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl ${small ? 'flex gap-3 h-28' : 'flex-col'}`}
    >
      <img
        src={`http://localhost:5000/api/proxy-image?url=${encodeURIComponent(imageUrl)}`}
        alt="article"
        className={`w-full h-auto object-cover `}
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
      <div className="p-3 space-y-1 transition-all duration-300 ease-in-out group-hover:-translate-y-1">
        <h3 className="font-semibold text-md text-gray-900 dark:text-white line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{article.description}</p>
        <p className="text-xs text-blue-500 mt-2">{article.source?.name}</p>
      </div>
    </Link>
  );
}
