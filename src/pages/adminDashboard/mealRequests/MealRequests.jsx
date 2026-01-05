import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    FaSearch,
    FaUser,
    FaCheckCircle,
    FaConciergeBell,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const MealRequests = () => {
    const [mealRequests, setMealRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMealRequests();
    }, []);

    const fetchMealRequests = () => {
        fetch("https://gurdian-care-server.vercel.app/mealRequests")
            .then((res) => res.json())
            .then((data) => {
                setMealRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch meal requests", err);
                setLoading(false);
            });
    };

    const handleServe = (id) => {
        Swal.fire({
            title: "Mark as Served?",
            text: "Are you sure you want to serve this meal?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5fbf54",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Serve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(
                        `https://gurdian-care-server.vercel.app/mealRequests/${id}`,
                        {
                            status: "delivered",
                        }
                    )
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
                                title: "Served!",
                                text: "The meal has been marked as delivered.",
                                confirmButtonColor: "#5fbf54",
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to update status.",
                        });
                        console.error(err);
                    });
            }
        });
    };

    const filteredMealRequests = mealRequests.filter(
        (meal) =>
            meal?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal?.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal?.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaConciergeBell className="text-[#5fbf54]" />
                        Serve Meals
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage and fulfill user meal requests.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search user, email or title..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Requested Meal
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                User Details
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Current Status
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center">
                                    <span className="loading loading-spinner text-[#5fbf54]"></span>
                                </td>
                            </tr>
                        ) : filteredMealRequests.length > 0 ? (
                            filteredMealRequests.map((meal) => (
                                <tr
                                    key={meal._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {/* Meal Title */}
                                    <td className="p-4 font-semibold text-gray-800">
                                        {meal?.title}
                                    </td>

                                    {/* User Info */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-full text-gray-400">
                                                <FaUser />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">
                                                    {meal?.userName}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {meal?.userEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-4 text-center">
                                        {meal?.status === "pending" ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold border border-yellow-200">
                                                <MdOutlinePendingActions />{" "}
                                                Pending
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                                <FaCheckCircle /> Served
                                            </span>
                                        )}
                                    </td>

                                    {/* Action Button */}
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() =>
                                                handleServe(meal._id)
                                            }
                                            disabled={
                                                meal?.status === "delivered"
                                            }
                                            className={`btn btn-sm border-none shadow-sm gap-2 normal-case font-medium transition-all
                                                ${
                                                    meal?.status === "delivered"
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-[#5fbf54] hover:bg-[#4da043] text-white"
                                                }`}
                                        >
                                            {meal?.status === "delivered"
                                                ? "Delivered"
                                                : "Serve Meal"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-12 text-center text-gray-500"
                                >
                                    No meal requests found matching "
                                    {searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Static) */}
            <div className="flex justify-end mt-6">
                <div className="join border border-gray-200 rounded-lg shadow-sm">
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        «
                    </button>
                    <button className="join-item btn btn-sm bg-[#5fbf54] text-white border-none">
                        1
                    </button>
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealRequests;
