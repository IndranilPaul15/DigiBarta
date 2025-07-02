import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MySummaries from "./pages/MySummaries";
import ArticleDetails from "./pages/ArticleDetails";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { v4 as uuidv4 } from 'uuid';
import Footer from "./components/Footer";

function App() {
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("visitorId")) {
      localStorage.setItem("visitorId", uuidv4());
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-[aliceblue] text-black dark:text-white dark:bg-gray-900 transition-colors duration-300 min-h-screen'>
      <Navbar category={category} setCategory={setCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} query={query} setQuery={setQuery} />
      <main className="flex-1 mt-34 md:mt-25">
        <Routes>
          <Route path="/" element={<Home category={category} searchTerm={searchTerm} setSearchTerm={setSearchTerm} query={query} setQuery={setQuery} />} />
          <Route path="/summaries" element={<MySummaries />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main >
      <Footer/>
    </div>
  )
}

export default App
