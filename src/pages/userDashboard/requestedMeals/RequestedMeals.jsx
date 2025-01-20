import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const RequestedMeals = () => {
    const { user } = useContext(AuthContext);

    const [requestedMeals, setRequestedMeals] = useState([]);

    console.log(requestedMeals);

    console.log("req", requestedMeals);
    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/mealRequests/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setRequestedMeals(data));
    }, []);

    const handleCancel = (_id) => {
        axios
            .delete(`https://gurdian-care-server.vercel.app/mealRequests/${_id}/${user?.email}`)
            .then((res) => {
                if (res.status === 200) {
                    setRequestedMeals(
                        requestedMeals.filter((meal) => meal._id !== _id)
                    );
                }
                Swal.fire({
                    title: "Success!",
                    text: "Request Cancelled successfully!",
                    icon: "success",
                    confirmButtonText: "Close",
                    customClass: {
                        confirmButton:
                            "btn bg-[#5fbf54] text-white border-none",
                    },
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Oops!",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "Close",
                    customClass: {
                        confirmButton: "btn btn-error text-white border-none",
                    },
                });
            });
    };
    return (
        <div>
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                My requested meals
            </h1>
            <div>
                <div className="overflow-x-auto border">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Meal Image</th>
                                <th>Meal Title</th>
                                <th>Status</th>
                                <th>Like Count</th>
                                <th>Review Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedMeals.map((meal) => (
                                <tr>
                                    <td>
                                        <div>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={meal?.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h1>{meal?.title}</h1>
                                    </td>
                                    <td>{meal?.status}</td>
                                    <td>
                                        <span>{meal?.likeCount || 0}</span>
                                    </td>
                                    <td>
                                        <span>{meal?.reviewCount || 0}</span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                handleCancel(meal?._id);
                                            }}
                                            className="btn btn-error text-white border-none"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RequestedMeals;
