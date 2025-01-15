import { useLoaderData } from "react-router-dom";

const MealDetails = () => {
    const data = useLoaderData();
    console.log("Meal Details");
    console.log(data);
    console.log("Meal Details");
    return (
        <div>
            
        </div>
    );
};

export default MealDetails;