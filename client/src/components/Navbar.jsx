import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar({ category, setCategory, setSearchTerm, query, setQuery }) {
    const [darkMode, setDarkMode] = useState(() => { return localStorage.getItem("theme") === "dark"; });
    const [dateTime, setDateTime] = useState('');
    const [weather, setWeather] = useState("Loading...");
    const [language, setLanguage] = useState("EN");
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const navigate = useNavigate();
    const [hasSearched, setHasSearched] = useState(false);
    const pathname = window.location.pathname


    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const dateOptions = { day: '2-digit', month: 'short', year: '2-digit' };
            const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

            const date = now.toLocaleDateString('en-GB', dateOptions);
            const time = now.toLocaleTimeString('en-US', timeOptions).toUpperCase();

            setDateTime(`${date} | ${time}`);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const apiKey = import.meta.env.VITE_OPENWEATHER_API
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                    );
                    const data = await res.json();
                    setWeather({
                        city: data.name,
                        temp: Math.round(data.main.temp),
                        iconCode: data.weather[0].icon
                    });
                } catch (err) {
                    setWeather("Weather unavailable");
                    console.log(err)
                }
            });
        }
    }, []);

    const handleLangChange = (e) => setLanguage(e.target.value);
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchTerm(query.trim());
            setCategory("");
            setHasSearched(true);
        }
    };
    // console.log(category)
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-400 border-b border-gray-200 dark:border-gray-700 font-poppins">
            {/* 🔷 Top Row */}
            <div className="Top flex flex-wrap justify-between items-center py-2 text-white gap-2 border-b border-gray-700 dark:border-gray-300 px-3 bg-gradient-to-r from-blue-600 via-violet-500 to-indigo-700 animated-background">
                {/* Social Icons */}
                <div className="flex gap-3 items-center">
                    <a className=" " href="/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={25} /></a>
                    <a className=" " href="/" target="_blank" rel="noopener noreferrer"><FaXTwitter size={25} /></a>
                    <a className=" " href="/" target="_blank" rel="noopener noreferrer"><FaGithub size={25} /></a>
                </div>

                {/* Weather Info */}
                {weather ? (<div className="weather flex justify-center items-center">
                    {weather.city} |
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`}
                        alt={weather.description}
                        className="w-8 h-8"
                    />
                    {weather.temp}°C
                </div>
                ) : (
                    <span>Loading weather...</span>
                )}

                {/* Date & Time */}
                <div className="hidden sm:block">{dateTime}</div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex border overflow-hidden rounded-full items-center w-3/4  sm:w-auto active:border-blue-500">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value), setHasSearched(false) }}
                        onClick={() => {
                            setQuery(''),
                                setHasSearched(false)
                        }
                        }
                        className="px-2 pl-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-full sm:w-69 border-none outline-none text-gray-900 dark:text-gray-200"
                    />
                    {hasSearched ? (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                setSearchTerm("");
                                setCategory("general");
                                navigate("/");
                                setHasSearched(false);
                            }}
                            className="bg-red-500 text-white px-3 py-1 hover:bg-red-600 cursor-pointer"
                        >
                            Clear
                        </button>
                    ) : (
                        <button

                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 cursor-pointer"
                        >
                            Search
                        </button>
                    )}

                </form>

                {/* Language Selector */}
                <select
                    value={language}
                    onChange={handleLangChange}
                    className="px-1.5 outline-none py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                    <option value="EN">EN</option>
                    <option value="HI">HI</option>
                    <option value="BN">BN</option>
                </select>


            </div>

            {/* 🔷 Bottom Row */}
            <div className="Bottom flex flex-wrap justify-between items-center p-2">

                <Link to='/' className="text-2xl font-abril text-blue-600 dark:text-white">
                    Digi Barta
                </Link>
                <div className=" flex justify-center items-center">
                    {/* Hamburger menu */}
                    <label className="p-1 sm:hidden flex flex-col gap-[6px] cursor-pointer z-50" htmlFor="menu-toggle">
                        <input
                            id="menu-toggle"
                            type="checkbox"
                            checked={isOpen}
                            onChange={toggleMenu}
                            className="peer hidden"
                            aria-label="Toggle navigation"
                        />
                        <span className={`w-6 h-[3px] bg-gray-950 dark:bg-gray-300 rounded-full transition-all origin-left duration-300 ${isOpen ? 'rotate-45 translate-y-0 translate-x-[3px]' : ''}`}></span>
                        <span className={`w-6 h-[3px] bg-gray-950 dark:bg-gray-300 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : ''}`}></span>
                        <span className={`w-6 h-[3px] bg-gray-950 dark:bg-gray-300 rounded-full transition-all origin-left duration-300 ${isOpen ? '-rotate-45 -translate-y-[1px] translate-x-[3px]' : ''}`}></span>
                    </label>

                    {/* Nav links */}
                    <div
                        className={`flex-col sm:flex-row gap-4 md:gap-6 justify-around items-center md:text-base absolute sm:static top-full left-0 w-full sm:w-auto sm:flex bg-gray-300 dark:bg-gray-800 sm:dark:bg-transparent sm:bg-transparent shadow sm:shadow-none z-40 p-4 sm:p-0 transition-all duration-500 ease-in-out transform ${isOpen ? 'flex translate-y-0 opacity-100' : 'hidden sm:flex -translate-y-full sm:translate-y-0 opacity-0 sm:opacity-100'}`}
                    >

                        <Link to="/" className={` active:font-bold active:sm:border-b-2 sm:border-0 sm:w-auto sm:px-2 sm:pb-0 border-b w-full pb-1 ${pathname === "/" ? "font-bold sm:border-b-3 text-blue-600 dark:text-amber-300" : ""}`} onClick={closeMenu}>Home</Link>
                        <select
                            value={category === "general" ? "" : category}
                            onChange={(e) => {
                                setSearchTerm("");
                                setCategory(e.target.value);
                                navigate("/");
                                closeMenu?.();
                            }}
                            className="sm:px-3 hover:text-blue-500 active:font-bold sm:border-none sm:w-auto sm:p-0  border-b w-full pb-1 bg-transparent  text-black dark:text-white outline-none "
                        >
                            <option value="" disabled hidden>
                                Category
                            </option>
                            <option className="text-white bg-gray-600 " value="technology">Technology</option>
                            <option className="text-white bg-gray-600 " value="business">Business</option>
                            <option className="text-white bg-gray-600 " value="sports">Sports</option>
                            <option className="text-white bg-gray-600 " value="health">Health</option>
                            <option className="text-white bg-gray-600 " value="science">Science</option>
                            <option className="text-white bg-gray-600 " value="entertainment">Entertainment</option>
                        </select>

                        <Link to="/summaries" className={` active:font-bold active:sm:border-b-2 sm:border-0 sm:w-auto sm:px-2 sm:pb-0 border-b w-full pb-1 ${pathname === "/summaries" ? "font-bold sm:border-b-3 text-blue-600 dark:text-amber-300" : ""}`} onClick={closeMenu}>Summaries</Link>
                        <Link to="/about" className={` active:font-bold active:sm:border-b-2 sm:border-0 sm:w-auto sm:px-2 sm:pb-0 border-b w-full pb-1 ${pathname === "/about" ? "font-bold sm:border-b-3 text-blue-600 dark:text-amber-300" : ""}`} onClick={closeMenu}>About</Link>
                        <Link to="/contact" className={` active:font-bold active:sm:border-b-2 sm:border-0 sm:w-auto sm:px-2 sm:pb-0 border-b w-full pb-1 ${pathname === "/contact" ? "font-bold sm:border-b-3 text-blue-600 dark:text-amber-300" : ""}`} onClick={closeMenu}>Contact</Link>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className=" p-2 sm:hidden cursor-pointer"
                    >
                        {darkMode ? <MdOutlineDarkMode size={20} /> : <MdOutlineLightMode size={20} />}
                    </button>
                </div>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className=" p-2 hidden sm:block cursor-pointer"
                >
                    {darkMode ? <MdOutlineDarkMode size={20} /> : <MdOutlineLightMode size={20} />}
                </button>
            </div>
        </nav>
    );
}
