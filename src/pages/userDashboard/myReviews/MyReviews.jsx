import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newText }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire(
                        "Updated!",
                        "Your review has been updated.",
                        "success"
                    );

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

    const handleViewMeal = (mealId) => {
        navigate(`/meals/${mealId}`);
    };

    return (
        <div>
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                My Reviews
            </h1>

            <div className="overflow-x-auto border">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Meal Title</th>
                            <th>Review</th>
                            <th>Like</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td>{review?.mealTitle}</td>
                                <td>{review?.text}</td>
                                <td>{review?.likeCount || 0}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn bg-[#5fbf54] btn-sm text-white border-none"
                                        onClick={() =>
                                            handleEdit(review._id, review.text)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm text-white border-none"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-success btn-sm text-white border-none"
                                        onClick={() =>
                                            handleViewMeal(review.mealId)
                                        }
                                    >
                                        View Meal
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingReview && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl font-semibold">Edit Review</h2>
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        rows="4"
                        className="textarea textarea-bordered w-full mb-4"
                    ></textarea>
                    <button
                        onClick={handleUpdate}
                        className="btn bg-[#5fbf54] text-white"
                    >
                        Update Review
                    </button>
                    <button
                        onClick={() => {
                            setEditingReview(null);
                            setNewText("");
                        }}
                        className="btn btn-error ml-2 text-white"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
