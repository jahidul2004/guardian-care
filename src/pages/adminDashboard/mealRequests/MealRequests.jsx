import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MealRequests = () => {
    const [mealRequests, setMealRequests] = useState([]);

    // Fetch meal requests
    useEffect(() => {
        fetchMealRequests();
    }, []);

    const fetchMealRequests = () => {
        fetch("http://localhost:3000/mealRequests")
            .then((res) => res.json())
            .then((data) => setMealRequests(data))
            .catch((err) => {
                console.error("Failed to fetch meal requests", err);
            });
    };

    // Handle serving meal
    const handleServe = (id) => {
        axios
            .put(`http://localhost:3000/mealRequests/${id}`, {
                status: "delivered",
            })
            .then((response) => {
                if (response.status === 200) {
                    // Update the status in the local state
                    setMealRequests((prevRequests) =>
                        prevRequests.map((meal) =>
                            meal._id === id
                                ? { ...meal, status: "delivered" }
                                : meal
                        )
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Meal Served Successfully",
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to serve meal",
                });
                console.error("Failed to serve meal", err);
            });
    };

    return (
        <div className="overflow-x-auto border">
            <h1 className="text-3xl font-bold text-center mb-5">
                Serve Requested Meal
            </h1>
            <table className="table table-zebra">
                {/* Table Head */}
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
                        <tr key={meal._id}>
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
                                <button
                                    onClick={() => handleServe(meal._id)}
                                    className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                    disabled={meal?.status === "delivered"}
                                >
                                    {meal?.status === "delivered"
                                        ? "Served"
                                        : "Serve"}
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
