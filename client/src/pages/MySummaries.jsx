import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
export default function MySummaries() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/summaries")
      .then(res => res.json())
      .then(data => setSummaries(data))
      .catch(err => console.error("Error fetching summaries:", err));
  }, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/summaries/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setSummaries(prev => prev.filter(s => s._id !== id));
      })
      .catch(err => console.error("Error deleting summary:", err));

  };
  // console.log(summaries)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📚 Saved Summaries</h1>

      {summaries.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No summaries saved yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((s) => (
            <div
              key={s._id}
              className="relative rounded-xl overflow-hidden group shadow-lg border border-gray-300 dark:border-gray-700"
            >
              {/* 🔹 Blurred Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover blur-[2px] scale-105 brightness-50"
                style={{ backgroundImage: `url(${s.image})` }} //|| "/fallback.jpg"
              ></div>

              {/* 🔹 Overlay Content */}
              <div className="relative z-10 p-4 flex flex-col justify-between h-full text-white">
                <div>
                  <h2 className="text-lg font-bold mb-2">{s.title}</h2>
                  <ul className="list-disc list-inside space-y-1 text-sm font-semibold">
                    {s.summary
                      .split("\n")
                      .map((line) => line.trim())
                      .filter((line) => line.length > 3)
                      .map((line, idx) => (
                        <li key={idx}>{line.replace(/\*{1,2}/g, "")}</li>
                      ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/article/${slugify(s.title)}`}
                    className="text-blue-300 underline hover:text-blue-200 text-sm"
                  >
                    Read Full →
                  </Link>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
