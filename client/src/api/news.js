const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const fetchNewsByCategory = async (category, page = 1) => {
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        query: "",
        page
      }),
    });

    const data = await res.json();
    console.log("Backend NewsAPI (category) response:", data);
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching category news (backend):", error);
    return [];
  }
};

export const fetchNewsByKeyword = async (keyword, page = 1) => {
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: keyword||"general",
        page
      }),
    });

    const data = await res.json();
    console.log("Backend NewsAPI (search) response:", data);
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching search news (backend):", error);
    return [];
  }
};
