import { useState, useEffect } from "react";
import bannerImg from "../assets/images/banner.jpg";

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [meals, setMeals] = useState([]);

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
            className="hero min-h-screen relative"
            style={{
                backgroundImage: `url(${bannerImg})`,
            }}
        >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold">
                        Compassion Meets Commitment
                    </h1>
                    <p className="mb-5 text-xs md:text-sm lg:text-base">
                        Guardian Care is your dedicated partner in delivering
                        personalized care solutions that bring peace of mind and
                        a brighter tomorrow.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-2">
                        <label className="input input-bordered bg-opacity-0 flex items-center gap-2 border-[#5fbf54]">
                            <input
                                type="text"
                                className="grow text-[#5fbf54] placeholder-[#5fbf54] bg-transparent"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            <div className="meals-list text-left max-h-[400px] max-w-[400px] overflow-y-auto absolute top-0 right-0">
                {filteredMeals.length > 0
                    ? filteredMeals.map((meal) => (
                          <div
                              key={meal._id}
                              className="meal-item bg-white p-4 rounded-lg shadow-lg mb-4"
                              style={{
                                  background: "rgba(255, 255, 255, 0.8)",
                                  backdropFilter: "blur(5px)",
                              }}
                          >
                              <h2 className="text-xl font-semibold">
                                  {meal.title}
                              </h2>
                              <p className="text-gray-700 mt-2">
                                  {meal.description}
                              </p>
                              <p className="mt-2 text-gray-500">
                                  <strong>Category:</strong> {meal.category}
                              </p>
                          </div>
                      ))
                    : searchQuery !== "" && (
                          <p className="text-white">
                              No meals found matching your search.
                          </p>
                      )}
            </div>
        </div>
    );
};

export default Banner;
