import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MealRequests = () => {
    const [mealRequests, setMealRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchMealRequests();
    }, []);

    const fetchMealRequests = () => {
        fetch("https://gurdian-care-server.vercel.app/mealRequests")
            .then((res) => res.json())
            .then((data) => setMealRequests(data))
            .catch((err) => {
                console.error("Failed to fetch meal requests", err);
            });
    };

    const handleServe = (id) => {
        axios
            .put(`https://gurdian-care-server.vercel.app/mealRequests/${id}`, {
                status: "delivered",
            })
            .then((response) => {
                if (response.status === 200) {
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMealRequests = mealRequests.filter(
        (meal) =>
            meal?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal?.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal?.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-x-auto border">
            <h1 className="text-3xl font-bold text-center mb-5">
                Serve Requested Meal
            </h1>

            {/* Search Input */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title, name, or email"
                    className="input input-bordered"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

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
                    {filteredMealRequests.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No meal requests found
                            </td>
                        </tr>
                    ) : (
                        filteredMealRequests.map((meal, index) => (
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
                        ))
                    )}
                </tbody>
            </table>

            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default MealRequests;
