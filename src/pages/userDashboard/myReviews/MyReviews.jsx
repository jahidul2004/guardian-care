import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [newText, setNewText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/reviews/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, [user?.email]);

    const handleDelete = (reviewId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://gurdian-care-server.vercel.app/reviews/${reviewId}`,
                    {
                        method: "DELETE",
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire(
                                "Deleted!",
                                "Your review has been deleted.",
                                "success"
                            );
                            setReviews((prevReviews) =>
                                prevReviews.filter(
                                    (review) => review._id !== reviewId
                                )
                            );
                        }
                    });
            }
        });
    };

    const handleEdit = (reviewId, currentText) => {
        setEditingReview(reviewId);
        setNewText(currentText);
    };

    const handleUpdate = () => {
        fetch(
            `https://gurdian-care-server.vercel.app/reviews/${editingReview}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newText }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your review has been updated.",
                        icon: "success",
                        confirmButtonColor: "#5fbf54",
                    });

                    setReviews((prevReviews) =>
                        prevReviews.map((review) =>
                            review._id === editingReview
                                ? { ...review, text: newText }
                                : review
                        )
                    );
                    setEditingReview(null);
                    setNewText("");
                }
            });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Reviews
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all the reviews you have posted.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 bg-green-50 text-[#5fbf54] px-4 py-2 rounded-full font-bold text-sm">
                    Total Reviews: {reviews.length}
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#5fbf54]/10 text-[#5fbf54] uppercase text-sm tracking-wider">
                            <th className="p-4 font-bold">Meal Title</th>
                            <th className="p-4 font-bold">Review</th>
                            <th className="p-4 font-bold text-center">Likes</th>
                            <th className="p-4 font-bold text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600 text-sm">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <tr
                                    key={review._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4 font-semibold text-gray-800">
                                        {review?.mealTitle}
                                    </td>
                                    <td className="p-4 max-w-xs">
                                        <p
                                            className="truncate"
                                            title={review?.text}
                                        >
                                            {review?.text}
                                        </p>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-1 text-[#5fbf54] font-bold">
                                            <AiFillLike />
                                            <span>
                                                {review?.likeCount || 0}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* View Button */}
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/meals/${review.mealId}`
                                                    )
                                                }
                                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#5fbf54] transition-all tooltip tooltip-top"
                                                data-tip="View Meal"
                                            >
                                                <FaEye size={18} />
                                            </button>

                                            {/* Edit Button */}
                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        review._id,
                                                        review.text
                                                    )
                                                }
                                                className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-all tooltip tooltip-top"
                                                data-tip="Edit Review"
                                            >
                                                <FaEdit size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(review._id)
                                                }
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all tooltip tooltip-top"
                                                data-tip="Delete Review"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-8 text-center text-gray-400"
                                >
                                    You haven't written any reviews yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal Overlay */}
            {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
                        {/* Modal Header */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">
                                Edit Your Review
                            </h3>
                            <button
                                onClick={() => setEditingReview(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update your experience:
                            </label>
                            <textarea
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                rows="5"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5fbf54]/20 focus:border-[#5fbf54] transition-all resize-none text-gray-700 bg-gray-50"
                                placeholder="Write your updated review here..."
                            ></textarea>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setEditingReview(null)}
                                    className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-2.5 rounded-lg bg-[#5fbf54] hover:bg-[#4da043] text-white font-bold shadow-md shadow-green-200 transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
