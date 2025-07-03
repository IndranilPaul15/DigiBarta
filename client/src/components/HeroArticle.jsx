import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
export default function HeroArticle({ article }) {
  // console.log()
  const imageUrl = article?.urlToImage || "";
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  return (
    <Link
      to={`/article/${slugify(article.title)}`}
      className="relative group overflow-hidden rounded-xl shadow-lg"
    >
      <img src={`${BACKEND_URL}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`}
        alt="hero" className="w-full h-99 sm:rounded-2xl sm:rounded-l-none object-cover group-hover:scale-105 transition-transform shadow-xl/30 dark:shadow-[0px_0px_16px_5px_rgba(255,255,255,0.5)] ml:ml-1"
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
      <div className="absolute bottom-37 xl:bottom-30 left-7 px-4 pl-3 py-1 rounded-tl-3xl rounded-br-3xl text-lg font-playfair text-white bg-blue-500">By <em className="text-base">{article.source.name}</em></div>
      <div className="absolute bottom-1 right-1 sm:right-2 border-2 border-gray-200  rounded-br-[50px] rounded-tl-4xl bg-black/66 w-fit md:ml-1 p-2 pt-4 pl-4 text-white">
        <h2 className="text-xl border-l-3 border-t-3 rounded-tl-2xl pl-4 border-red-600 p-1.5 font-bold mb-1 line-clamp-2">{article.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-2">{article.description}</p>
      </div>
    </Link>
  );
}
