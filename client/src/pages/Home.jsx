import { useEffect, useState, useRef, useCallback } from "react";
import { fetchNewsByCategory, fetchNewsByKeyword } from "../api/news";
import HeroArticle from "../components/HeroArticle";
import ArticleCard from "../components/ArticleCard";
import TrendingTabs from "../components/TrendingTabs";
import SkeletonCard from "../components/SkeletonCard";
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Home({ category, searchTerm, setSearchTerm, setQuery }) {
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cardLoading, setCardLoading] = useState(true);

  const observer = useRef();

  const lastCardRef = useCallback((node) => {
    if (loading || !hasMore || searchTerm) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, searchTerm]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category, searchTerm]);

  useEffect(() => {
    const loadArticles = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setCardLoading(true);
      }
      try {
        let data = [];

        if (searchTerm) {
          if (page !== 1) return;
          data = await fetchNewsByKeyword(searchTerm, page);
          setHasMore(false);
        } else {
          data = await fetchNewsByCategory(category, page);
          if (data.length === 0) setHasMore(false);
        }

        setArticles((prev) => [...prev, ...data]);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
      setLoading(false);
      setCardLoading(false);
    };

    loadArticles();
  }, [category, page, searchTerm]);

  return (
    <section className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="md:col-span-2">
          {articles[0] && <HeroArticle article={articles[0]} />}
        </div>
        <div className="flex flex-col gap-4 sm:mr-2">
          {articles[1] && <ArticleCard article={articles[1]} small />}
          {articles[2] && <ArticleCard article={articles[2]} small />}
          {articles[3] && <ArticleCard article={articles[3]} small />}
        </div>
      </div>

      {searchTerm && (
        <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-white px-2">
          🔍 Showing results for: <span className="text-blue-600">{searchTerm}</span>
        </h2>
      )}

      {!searchTerm && (
        <TrendingTabs
          mainCategory={category}
          trending={trending}
          setTrending={setTrending}
          setSearchTerm={setSearchTerm}
          setQuery={setQuery}
        />
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {cardLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i}>
              <SkeletonCard/>
            </div>
          ))
        ) : (
          articles.slice(4).map((article, index) => {
            const isLast = index === articles.slice(4).length - 1;
            return (
              <div key={index} ref={isLast ? lastCardRef : null}>
                <ArticleCard article={article} />
              </div>
            );
          })
        )}

      </Masonry>
      {loading && (
        <div className="flex justify-center w-full py-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </section>
  );
}
