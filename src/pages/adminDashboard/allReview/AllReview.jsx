import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data));
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
                            <th>Reviewer</th>
                            <th>Meal Title</th>
                            <th>Review Text</th>
                            <th>Rating</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr>
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
                                <td>{review.rating}</td>

                                <th className="flex gap-2">
                                    <button className="btn btn-sm btn-error text-white border-none">
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
