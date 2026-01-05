import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import MealCard from "../../components/MealCard";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa"; // Icon import
import { MdOutlineFoodBank } from "react-icons/md";

const Meals = () => {
    const meals = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    // Filtering & Sorting Logic
    const filteredMeals = meals
        .filter((meal) => {
            const isSearchMatch = meal.title
                .toLowerCase()
                .includes(searchText.toLowerCase());
            const isCategoryMatch = categoryFilter
                ? meal.category === categoryFilter
                : true;
            return isSearchMatch && isCategoryMatch;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.price - b.price;
            } else if (sortOrder === "desc") {
                return b.price - a.price;
            }
            return 0;
        });

    const categories = [...new Set(meals.map((meal) => meal.category))];

    return (
        <section className="min-h-screen bg-gray-50 py-10 md:py-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h6 className="text-[#5fbf54] font-bold tracking-wider uppercase text-sm mb-2">
                        Discover Taste
                    </h6>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                        All Premium{" "}
                        <span className="text-[#5fbf54]">Meals</span>
                    </h1>
                    <p className="text-gray-500">
                        Explore our wide variety of nutritious meals. Filter by
                        category or search for your favorite dish.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 mb-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by meal title..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <FaFilter className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all appearance-none cursor-pointer text-gray-600"
                                value={categoryFilter}
                                onChange={(e) =>
                                    setCategoryFilter(e.target.value)
                                }
                            >
                                <option value="">All Categories</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Arrow for Select */}
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <FaSortAmountDown className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all appearance-none cursor-pointer text-gray-600"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="">Default Sorting</option>
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                            </select>
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {filteredMeals.length > 0 ? (
                        filteredMeals.map((meal) => (
                            <MealCard key={meal._id} data={meal} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-green-50 p-6 rounded-full mb-4">
                                <MdOutlineFoodBank className="text-6xl text-[#5fbf54] opacity-50" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700">
                                No Meals Found
                            </h3>
                            <p className="text-gray-500 mt-2">
                                We couldn't find any meals matching your search
                                criteria. <br /> Try changing the filters or
                                search term.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchText("");
                                    setCategoryFilter("");
                                }}
                                className="mt-6 text-[#5fbf54] font-semibold hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Meals;
