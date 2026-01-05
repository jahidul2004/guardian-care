import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // react-icons ইন্সটল করা না থাকলে সাধারণ SVG আইকন ব্যবহার করতে পারো
import bannerImg from "../assets/images/banner.jpg";

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [meals, setMeals] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/meals")
            .then((res) => res.json())
            .then((data) => setMeals(data));
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredMeals([]);
        } else {
            const filtered = meals.filter(
                (meal) =>
                    meal.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    meal.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    meal.category
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setFilteredMeals(filtered);
        }
    }, [searchQuery, meals]);

    return (
        <div
            className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bannerImg})`,
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

            <div className="relative z-1 container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto text-white">
                    <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                        Compassion Meets{" "}
                        <span className="text-[#5fbf54]">Commitment</span>
                    </h1>
                    <p className="mb-8 text-base md:text-lg text-gray-200 drop-shadow-md">
                        Guardian Care is your dedicated partner in delivering
                        personalized care solutions that bring peace of mind and
                        a brighter tomorrow.
                    </p>

                    {/* Search Container */}
                    <div className="relative max-w-xl mx-auto">
                        <div
                            className={`flex items-center bg-white rounded-full px-6 py-4 shadow-2xl transition-all duration-300 ${
                                isFocused
                                    ? "ring-4 ring-[#5fbf54]/30 transform scale-105"
                                    : ""
                            }`}
                        >
                            <input
                                type="text"
                                className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
                                placeholder="Search for meals or care plans..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() =>
                                    setTimeout(() => setIsFocused(false), 200)
                                } // Delay close for click
                            />
                            <button className="text-[#5fbf54] hover:text-[#4da043] transition-colors p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Search Results Dropdown */}
                        {searchQuery && isFocused && (
                            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl overflow-hidden max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent z-50 text-left animate-fadeIn">
                                {filteredMeals.length > 0 ? (
                                    filteredMeals.map((meal) => (
                                        <div
                                            key={meal._id}
                                            className="p-4 border-b border-gray-100 last:border-none hover:bg-green-50 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5fbf54] transition-colors">
                                                        {meal.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                        {meal.description}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-semibold bg-green-100 text-[#5fbf54] px-2 py-1 rounded-md">
                                                    {meal.category}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        <p>
                                            No meals found matching "
                                            {searchQuery}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
