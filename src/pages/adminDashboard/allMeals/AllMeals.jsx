import { useEffect, useState } from "react";

const AllMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/meals")
            .then((res) => res.json())
            .then((data) => setMeals(data));
    }, []);
    return (
        <div className="py-2">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                All Meals
            </h1>
            <div className="overflow-x-auto border">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={meal?.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{meal?.title}</td>
                                <td>{meal?.likeCount || 0}</td>
                                <td>{meal?.reviewCount || 0}</td>
                                <td>{meal.rating}</td>

                                <th className="flex gap-2">
                                    <button className="btn btn-sm bg-[#5fbf54] text-white border-none">
                                        Update
                                    </button>
                                    <button className="btn btn-sm btn-error text-white border-none">
                                        Delete
                                    </button>
                                    <button className="btn btn-sm bg-[#5fbf54] text-white border-none">
                                        View Meal
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMeals;
