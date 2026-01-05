import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaHeart, FaCommentAlt, FaUtensils } from "react-icons/fa";

const RequestedMeals = () => {
    const { user } = useContext(AuthContext);
    const [requestedMeals, setRequestedMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(
                `https://gurdian-care-server.vercel.app/mealRequests/${user.email}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setRequestedMeals(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // Helper for Status Badge Color
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-700 border-green-200";
            case "pending":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "cancelled":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const handleCancel = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this meal request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(
                        `https://gurdian-care-server.vercel.app/mealRequests/${_id}/${user?.email}`
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            setRequestedMeals(
                                requestedMeals.filter(
                                    (meal) => meal._id !== _id
                                )
                            );
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your request has been cancelled.",
                                icon: "success",
                                confirmButtonColor: "#5fbf54",
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error!",
                            text: err.message,
                            icon: "error",
                            confirmButtonColor: "#d33",
                        });
                    });
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUtensils className="text-[#5fbf54]" />
                        Requested Meals
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track the status of your meal requests here.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 bg-green-50 text-[#5fbf54] px-5 py-2 rounded-full font-bold text-sm">
                    Total Requests: {requestedMeals.length}
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Meal Details
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Engagement
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Status
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center">
                                    <span className="loading loading-spinner text-[#5fbf54] loading-md"></span>
                                </td>
                            </tr>
                        ) : requestedMeals.length > 0 ? (
                            requestedMeals.map((meal) => (
                                <tr
                                    key={meal._id}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Meal Image & Title */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                <img
                                                    src={meal?.image}
                                                    alt={meal?.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-base">
                                                    {meal?.title}
                                                </h3>
                                                <span className="text-xs text-gray-400">
                                                    ID: {meal?._id?.slice(-6)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Likes & Reviews */}
                                    <td className="p-4">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-1 text-pink-500 font-medium bg-pink-50 px-2 py-1 rounded-md text-xs w-20 justify-center">
                                                <FaHeart />{" "}
                                                {meal?.likeCount || 0} Likes
                                            </div>
                                            <div className="flex items-center gap-1 text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded-md text-xs w-20 justify-center">
                                                <FaCommentAlt />{" "}
                                                {meal?.reviewCount || 0} Rev
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusStyle(
                                                meal?.status
                                            )}`}
                                        >
                                            {meal?.status}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="p-4 text-center">
                                        {meal?.status?.toLowerCase() !==
                                            "delivered" && (
                                            <button
                                                onClick={() =>
                                                    handleCancel(meal?._id)
                                                }
                                                className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border-none transition-all shadow-sm gap-2"
                                            >
                                                <FaTrashAlt /> Cancel
                                            </button>
                                        )}
                                        {meal?.status?.toLowerCase() ===
                                            "delivered" && (
                                            <span className="text-gray-400 text-xs italic">
                                                Completed
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-12 text-center text-gray-500"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gray-100 p-4 rounded-full mb-2">
                                            <FaUtensils className="text-gray-400 text-2xl" />
                                        </div>
                                        <p>
                                            You haven't requested any meals yet.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
