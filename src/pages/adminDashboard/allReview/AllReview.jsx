import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaStar, FaTrash, FaEye, FaSearch, FaQuoteRight } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const AllReview = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/reviews")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Review?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://gurdian-care-server.vercel.app/reviews/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setReviews(
                                reviews.filter((review) => review._id !== id)
                            );
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "The review has been removed.",
                                confirmButtonColor: "#5fbf54",
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the review.",
                            "error"
                        );
                    });
            }
        });
    };

    // Helper to render stars
    const renderStars = (rating) => {
        return (
            <div className="flex text-orange-400 text-xs">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={
                            i < rating ? "fill-current" : "text-gray-200"
                        }
                    />
                ))}
            </div>
        );
    };

    const filteredReviews = reviews.filter(
        (review) =>
            review?.mealTitle
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            review?.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <MdRateReview className="text-[#5fbf54]" />
                        All Reviews
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage user feedbacks and ratings.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search meal or review text..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                Reviewer
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                Meal Context
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100">
                                Feedback
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Rating
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center">
                                    <span className="loading loading-spinner text-[#5fbf54]"></span>
                                </td>
                            </tr>
                        ) : filteredReviews.length > 0 ? (
                            filteredReviews.map((review) => (
                                <tr
                                    key={review._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {/* Reviewer Info */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full ring-2 ring-gray-100 overflow-hidden">
                                                    <img
                                                        src={
                                                            review?.profileImage ||
                                                            "https://i.ibb.co/T1b144R/placeholder.png"
                                                        }
                                                        alt="Reviewer"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">
                                                    {review?.userName ||
                                                        "Anonymous"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Meal Title */}
                                    <td className="p-4 font-semibold text-gray-700">
                                        {review?.mealTitle}
                                    </td>

                                    {/* Review Text */}
                                    <td className="p-4 max-w-xs">
                                        <div className="flex gap-2 text-gray-600 italic relative group cursor-help">
                                            <FaQuoteRight className="text-gray-300 text-xs flex-shrink-0" />
                                            <p
                                                className="truncate"
                                                title={review?.text}
                                            >
                                                {review?.text}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Rating */}
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            {renderStars(review?.rating)}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/meals/${review.mealId}`}
                                                className="p-2 rounded-lg text-gray-500 hover:bg-green-50 hover:text-[#5fbf54] transition-all"
                                                title="View Meal"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(review._id)
                                                }
                                                className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                                title="Delete Review"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-12 text-center text-gray-500"
                                >
                                    No reviews found matching "{searchTerm}"
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

export default AllReview;
