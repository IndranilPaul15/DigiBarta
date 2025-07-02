const trendingTags = {
    technology: ["AI", "Startups", "Gadgets", "Software", "Mobile"],
    business: ["Markets", "Economy", "Startups", "Crypto"],
    sports: ["Cricket", "Football", "Tennis", "Olympics"],
    entertainment: ["Bollywood", "Hollywood", "TV Shows", "Music"],
    health: ["Fitness", "Mental Health", "Nutrition", "Covid"],
    science: ["Space", "Climate", "Biology", "Physics"],
    general: ["Top", "India", "World", "Opinion"]
};


export default function TrendingTabs({ mainCategory, trending, setTrending,setQuery,setSearchTerm }) {
    const tags = trendingTags[mainCategory] || [];

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                Trending in <span className="capitalize text-blue-600">{mainCategory}</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => setTrending("all")}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium capitalize transition cursor-pointer ${trending === "all"
                        ? " text-blue-600  border-blue-600 shadow "
                        : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                        }`}
                >
                    All
                </button>

                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => {
                            setTrending(tag);
                            setQuery(tag);       
                            setSearchTerm(tag);
                        }}
                        className={`px-4 py-1.5 rounded-full border text-sm font-medium capitalize transition cursor-pointer ${trending === tag
                            ? "text-blue-600 cursor-pointer border-blue-600 shadow"
                            : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

