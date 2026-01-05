import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Filled icon added for better UX
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const UpcomingMealCard = ({ data }) => {
    const { user } = useContext(AuthContext);
    const { title, image, description, price, _id } = data || {};

    // State management
    const [likeCount, setLikeCount] = useState(data.likeCount || 0);
    const [userLiked, setUserLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // For button animation

    useEffect(() => {
        const likedMeals = JSON.parse(localStorage.getItem("likedMeals")) || [];
        if (likedMeals.includes(_id)) {
            setUserLiked(true);
        }
    }, [_id]);

    const handleLike = () => {
        if (userLiked) {
            return; // Already handled by disabled state, but good as backup
        }
        if (!user) {
            Swal.fire({
                icon: "warning", // Changed to warning for softer tone
                title: "Login Required",
                text: "Please login to like this upcoming meal!",
                confirmButtonColor: "#5fbf54",
            });
            return;
        }

        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);
        setUserLiked(true);

        const likedMeals = JSON.parse(localStorage.getItem("likedMeals")) || [];
        localStorage.setItem(
            "likedMeals",
            JSON.stringify([...likedMeals, _id])
        );

        axios
            .put(
                `https://gurdian-care-server.vercel.app/upcomingMeals/${_id}`,
                {
                    likeCount: newLikeCount,
                }
            )
            .then((res) => {
                console.log("Like updated successfully");
            })
            .catch((err) => {
                console.error("Error updating like:", err);
            });
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
            {/* Image Section with Badge */}
            <div className="relative overflow-hidden h-60 w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>

                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                    Coming Soon
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5fbf54] transition-colors">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Price & Divider */}
                <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-400 font-medium">
                                Expected Price
                            </p>
                            <p className="text-lg font-bold text-[#5fbf54]">
                                ${price}{" "}
                                <span className="text-xs text-gray-400 font-normal">
                                    (Approx)
                                </span>
                            </p>
                        </div>

                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            disabled={userLiked}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-semibold shadow-sm
                                ${
                                    userLiked
                                        ? "bg-green-100 text-[#5fbf54] cursor-default"
                                        : "bg-gray-100 text-gray-600 hover:bg-[#5fbf54] hover:text-white active:scale-95"
                                }
                            `}
                        >
                            <span className="text-xl">
                                {userLiked ? <AiFillLike /> : <AiOutlineLike />}
                            </span>
                            <span>{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealCard;
