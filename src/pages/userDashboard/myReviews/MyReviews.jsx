import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    // console.log(reviews);

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/reviews/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, []);
    return (
        <div>
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                My Reviews
            </h1>

            <div className="overflow-x-auto border">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Meal Title</th>
                            <th>Review</th>
                            <th>Like</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {reviews.map((review) => (
                            <tr>
                                <td>{review?.mealTitle}</td>
                                <td>{review?.text}</td>
                                <td>{review?.likeCount || 0}</td>
                                <td className="flex gap-2">
                                    <button className="btn bg-[#5fbf54] btn-sm text-white border-none">
                                        Edit
                                    </button>
                                    <button className="btn btn-error btn-sm text-white border-none">
                                        Delete
                                    </button>
                                    <button className="btn btn-success btn-sm text-white border-none">
                                        View Meal
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
