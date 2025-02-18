import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import MealCard from "../../components/MealCard";

const Meals = () => {
    const meals = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");

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
        <div className="p-5 md:p-10">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">Meals</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by meal title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full"
                />
                <select
                    className="select select-bordered w-full"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered w-full"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <MealCard key={meal._id} data={meal} />
                    ))
                ) : (
                    <p className="text-center col-span-full">
                        No meals found matching your criteria.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Meals;
