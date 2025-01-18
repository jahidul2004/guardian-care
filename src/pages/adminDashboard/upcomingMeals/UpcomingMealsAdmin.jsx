import { useEffect, useState } from "react";

const UpcomingMealsAdmin = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/upcomingMeals")
            .then((res) => res.json())
            .then((data) => {
                setMeals(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    return (
        <div className="text-center">
            <h1 className="text-center text-3xl font-bold mb-5">
                Upcoming Meals
            </h1>
            <button className="btn bg-[#5fbf54] text-white border-none">
                Add Upcoming Meal
            </button>
            <div>
                <div className="overflow-x-auto border mt-5">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Meal Title</th>
                                <th>Price</th>
                                <th>Like Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{meal.title}</td>
                                    <td>{meal.price}$</td>
                                    <td>{meal.likeCount || 0}</td>
                                    <td>
                                        <button className="btn btn-sm bg-[#5fbf54] text-white border-none">
                                            Publish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealsAdmin;
