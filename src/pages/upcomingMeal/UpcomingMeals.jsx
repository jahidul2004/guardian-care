import { useLoaderData } from "react-router-dom";
import UpcomingMealCard from "../../components/UpcomingMealCard";

const UpcomingMeals = () => {
    const meals = useLoaderData();

    const sortedMeals = meals?.sort((a, b) => b.likeCount - a.likeCount);

    return (
        <div className="p-5 md:p-10">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Upcoming Meal
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedMeals?.map((meal) => (
                    <UpcomingMealCard
                        key={meal._id}
                        data={meal}
                    ></UpcomingMealCard>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMeals;
