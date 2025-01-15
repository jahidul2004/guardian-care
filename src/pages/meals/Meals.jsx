import { useLoaderData } from "react-router-dom";
import MealCard from "../../components/MealCard";

const Meals = () => {
    const meals = useLoaderData();
    return (
        <div className="p-5 md:p-10">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">Meals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {meals.map((meal) => (
                    <MealCard key={meal._id} data={meal} />
                ))}
            </div>
        </div>
    );
};

export default Meals;
