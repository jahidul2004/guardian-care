import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const UpcomingMealCard = ({ data }) => {
    const { user } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(data.likeCount);
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        const likedMeals = JSON.parse(localStorage.getItem("likedMeals")) || [];
        if (likedMeals.includes(data._id)) {
            setUserLiked(true);
        }
    }, [data._id]);

    const handleLike = (id) => {
        if (userLiked) {
            alert("You have already liked this meal!");
            return;
        }
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login to like a meal!",
            });
            return;
        }

        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);
        setUserLiked(true);

        const likedMeals = JSON.parse(localStorage.getItem("likedMeals")) || [];
        localStorage.setItem("likedMeals", JSON.stringify([...likedMeals, id]));

        axios
            .put(`https://gurdian-care-server.vercel.app/upcomingMeals/${id}`, {
                likeCount: newLikeCount,
            })
            .then((res) => {
                console.log("Like updated successfully:", res.data);
            })
            .catch((err) => {
                console.error("Error updating like:", err);
            });
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={data?.image}
                    alt="Meal"
                    className="w-full h-[250px] object-cover"
                />
            </figure>
            <div className="card-body text-left">
                <div className="flex items-center gap-4">
                    <h2 className="card-title text-2xl">{data?.title}</h2>
                    <span className="border rounded-2xl px-2 border-error font-semibold">
                        Coming Soon
                    </span>
                </div>
                <p>{data?.description}</p>
                <p className="font-semibold text-[#5fbf54]">
                    Price: {data?.price}$ (Approx)
                </p>
            </div>
            <div className="flex items-center justify-between m-4">
                <button
                    onClick={() => {
                        handleLike(data._id);
                    }}
                    disabled={userLiked}
                    className={`btn w-max bg-[#5fbf54] text-white text-xl rounded-full ${
                        userLiked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    <AiOutlineLike />
                    <span className="ml-2">{likeCount}</span>
                </button>
            </div>
        </div>
    );
};

export default UpcomingMealCard;
