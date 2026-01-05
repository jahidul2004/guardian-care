import { useLoaderData } from "react-router-dom";
import UpcomingMealCard from "../../components/UpcomingMealCard";
import { MdOutlineUpcoming } from "react-icons/md";

const UpcomingMeals = () => {
    const meals = useLoaderData();

    // Create a copy before sorting to avoid mutating read-only data from loader
    const sortedMeals = [...(meals || [])].sort(
        (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
    );

    return (
        <section className="min-h-screen bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <MdOutlineUpcoming className="text-[#5fbf54] text-xl" />
                        <h6 className="text-[#5fbf54] font-bold tracking-wider uppercase text-sm">
                            Coming Soon
                        </h6>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                        Shape Our Next{" "}
                        <span className="text-[#5fbf54]">Menu</span>
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed">
                        Explore our upcoming dishes and vote for your favorites.
                        The meals with the most likes will be added to our main
                        menu!
                    </p>
                </div>

                {/* Grid Section */}
                {sortedMeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
                        {sortedMeals.map((meal) => (
                            <UpcomingMealCard key={meal._id} data={meal} />
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="bg-green-50 p-6 rounded-full mb-4">
                            <MdOutlineUpcoming className="text-6xl text-[#5fbf54] opacity-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700">
                            No Upcoming Meals
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Stay tuned! We are curating new delicious recipes
                            for you.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingMeals;
