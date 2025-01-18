import { useEffect, useState } from "react";

const MealRequests = () => {
    const [mealRequests, setMealRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/mealRequests")
            .then((res) => res.json())
            .then((data) => setMealRequests(data));
    }, []);
    return (
        <div className="overflow-x-auto border">
            <h1 className="text-3xl font-bold text-center mb-5">
                Serve Requested Meal
            </h1>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Meal Title</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mealRequests.map((meal, index) => (
                        <tr>
                            <th>{index + 1}</th>
                            <td>{meal?.title}</td>
                            <td>{meal?.userName}</td>
                            <td>{meal?.userEmail}</td>
                            <td
                                className={
                                    meal?.status === "pending"
                                        ? "text-warning"
                                        : "text-[#5fbf54]"
                                }
                            >
                                {meal?.status}
                            </td>
                            <td>
                                <button className="btn btn-sm bg-[#5fbf54] text-white border-none">
                                    Serve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MealRequests;
