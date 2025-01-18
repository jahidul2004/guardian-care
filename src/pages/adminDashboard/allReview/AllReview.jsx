import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    const handleDelete = (id) => {
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
                fetch(`http://localhost:3000/reviews/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setReviews(
                                reviews.filter((review) => review._id !== id)
                            );
                            Swal.fire(
                                "Deleted!",
                                "The review has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the review.",
                            "error"
                        );
                        console.error("Delete Error:", error);
                    });
            }
        });
    };

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
                            <th>Reviewer</th>
                            <th>Meal Title</th>
                            <th>Review Text</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={review?.profileImage}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{review?.mealTitle}</td>
                                <td>{review?.text}</td>
                                <td>{review?.rating}</td>
                                <th className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-sm btn-error text-white border-none"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/meals/${review.mealId}`}
                                        className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                    >
                                        View Meal
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReview;
