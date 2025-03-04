import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import ReviewCard from "../../components/ReviewCard";

const MealDetails = () => {
    const data = useLoaderData();
    const [likeCount, setLikeCount] = useState(data.likeCount || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [givenRating, setGivenRating] = useState(1);
    const [reviews, setReviews] = useState([]);

    const [dbUser, setDbUser] = useState(null);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/user/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setDbUser(data);
            });
    }, [user?.email]);

    useEffect(() => {
        fetch(`https://gurdian-care-server.vercel.app/reviews/meal/${data?._id}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, []);

    const handleRequestMeal = (_id) => {
        if (dbUser?.badge === "bronze") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to be a silver or gold or platinum member to request a meal!",
            });
            return;
        }
        const request = {
            mealId: _id,
            userEmail: user?.email,
            userName: user?.displayName,
            userBadge: dbUser?.badge,
            status: "pending",
            image: data?.image,
            title: data?.title,
            likeCount: data?.likeCount,
            reviewCount: data?.reviewCount,
        };

        axios
            .post("https://gurdian-care-server.vercel.app/mealRequests", request)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Your request has been sent successfully!",
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.message,
                });
            });
    };

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
            .put(`https://gurdian-care-server.vercel.app/meals/${_id}`, {
                likeCount: likeCount + 1,
            })
            .then((res) => {
                // console.log("Server updated:", res.data);
            })
            .catch((err) => {
                console.error(err);
                setIsLiked(false);
                setLikeCount((prevCount) => prevCount - 1);
            });
    };

    const handleRating = (newRating) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login first!",
            });
            return;
        }

        setGivenRating(newRating);
    };

    const handleReview = (e) => {
        e.preventDefault();
        const rating = givenRating;
        const text = e.target.reviewText.value;

        const newReview = {
            mealId: data?._id,
            userName: user?.displayName,
            userEmail: user?.email,
            rating,
            text,
            postTime: new Date().toLocaleString(),
            profileImage: user?.photoURL,
            mealTitle: data?.title,
            likeCount: data?.likeCount,
        };

        axios
            .post("https://gurdian-care-server.vercel.app/reviews", newReview)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Your review has been posted successfully!",
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.message,
                });
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-5 md:p-10">
            <div className="h-[450px] w-full">
                <img
                    className="h-full w-full rounded-lg object-cover"
                    src={data?.image}
                    alt=""
                />
            </div>
            <div className="w-full bg-[#f9f9f9] p-5 rounded-lg relative">
                <h1 className="text-3xl font-bold mb-2">{data?.title}</h1>
                <StarRatings
                    rating={data?.rating}
                    numberOfStars={5}
                    name="rating"
                    starRatedColor="#5fbf54"
                    starDimension="20px"
                />
                <p className="my-2">{data?.description}</p>
                <p className="font-semibold">Price: {data?.price}$</p>
                <p className="font-semibold">
                    Distributor: {data?.distributorName}
                </p>
                <h1 className="font-semibold">Ingredients</h1>
                <ul className="list-disc pl-5 mt-2">
                    {data?.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => {
                            handleLike(data?._id);
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

                    <button
                        onClick={() => {
                            handleRequestMeal(data?._id);
                        }}
                        className="btn bg-[#5fbf54] text-white border-none mt-2"
                    >
                        Request For This Meal
                    </button>
                </div>

                <div className="mt-5">
                    <h2 className="font-bold text-lg">Review this meal</h2>
                    <form
                        onSubmit={handleReview}
                        className="flex flex-col lg:flex-row items-center gap-2"
                    >
                        <div>
                            <StarRatings
                                rating={givenRating}
                                changeRating={handleRating}
                                numberOfStars={5}
                                name="userRating"
                                starRatedColor="#5fbf54"
                                starHoverColor="#4caf50"
                                starDimension="25px"
                                starSpacing="5px"
                            />
                        </div>
                        <textarea
                            required
                            cols={30}
                            rows={1}
                            name="reviewText"
                            className="textarea bg-transparent textarea-bordered"
                            placeholder="Write something about this meal"
                        ></textarea>
                        <button className="btn bg-[#5fbf54] text-white border-none">
                            Submit
                        </button>
                    </form>
                </div>

                <p className="absolute bottom-2 right-2 font-bold text-xs">
                    {data.postTime}
                </p>
            </div>

            <div className="border p-5 rounded-lg md:col-span-2">
                <h1 className="text-center font-bold text-3xl py-4 mb-10">
                    Reviews({reviews.length})
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} data={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
