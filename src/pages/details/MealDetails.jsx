import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const MealDetails = () => {
    const data = useLoaderData();
    const [likeCount, setLikeCount] = useState(data.likeCount || 0);
    const [isLiked, setIsLiked] = useState(false);

    const { user } = useContext(AuthContext);

    const handleLike = (_id) => {
        setIsLiked(true);

        setLikeCount((prevCount) => prevCount + 1);

        if (!user) {
            setIsLiked(false);
            setLikeCount((prevCount) => prevCount - 1);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login first!",
            });
            return;
        }

        axios
            .put(`http://localhost:3000/meals/${_id}`, {
                likeCount: likeCount + 1,
            })
            .then((res) => {
                console.log("Server updated:", res.data);
            })
            .catch((err) => {
                console.error(err);
                setIsLiked(false);
                setLikeCount((prevCount) => prevCount - 1);
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-5 md:p-10">
            <div className="h-[400px] w-full">
                <img
                    className="h-full w-full rounded-lg object-cover"
                    src={data.image}
                    alt=""
                />
            </div>
            <div className="w-full bg-[#f9f9f9] p-5 rounded-lg relative">
                <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                <p className="mb-2">{data.description}</p>
                <p className="font-semibold">Price: {data.price}$</p>
                <StarRatings
                    rating={data.rating}
                    numberOfStars={5}
                    name="rating"
                    starRatedColor="#5fbf54"
                    starDimension="20px"
                />

                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => {
                            handleLike(data._id);
                        }}
                        disabled={isLiked}
                        className={`btn border-2 ${
                            isLiked
                                ? "border-gray-400 text-gray-400"
                                : "border-[#5fbf54]"
                        }`}
                    >
                        <AiOutlineLike
                            className={`font-bold text-2xl ${
                                isLiked ? "text-gray-400" : "text-[#5fbf54]"
                            }`}
                        />
                        <span>{likeCount}</span>
                    </button>
                    <button className="btn bg-[#5fbf54] text-white border-none mt-2">
                        Order Now
                    </button>
                </div>

                <p className="absolute bottom-2 right-2 font-bold text-xs">
                    {data.postTime}
                </p>
            </div>
        </div>
    );
};

export default MealDetails;
