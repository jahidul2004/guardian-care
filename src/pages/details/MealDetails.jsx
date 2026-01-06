import axios from "axios";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import ReviewCard from "../../components/ReviewCard";
import { FaUserTie, FaClock, FaTags, FaPenNib } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";

const MealDetails = () => {
    const data = useLoaderData();
    const { user } = useContext(AuthContext);

    // State
    const [likeCount, setLikeCount] = useState(data.likeCount || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [givenRating, setGivenRating] = useState(0); // Default 0 forces user to pick
    const [reviews, setReviews] = useState([]);
    const [dbUser, setDbUser] = useState(null);
    const [loadingReviews, setLoadingReviews] = useState(true);

    // Fetch User Info
    useEffect(() => {
        if (user?.email) {
            fetch(`https://gurdian-care-server.vercel.app/user/${user?.email}`)
                .then((res) => res.json())
                .then((data) => setDbUser(data));
        }
    }, [user?.email]);

    // Fetch Reviews
    useEffect(() => {
        fetch(
            `https://gurdian-care-server.vercel.app/reviews/meal/${data?._id}`
        )
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setLoadingReviews(false);
            })
            .catch(() => setLoadingReviews(false));
    }, [data?._id]);

    // Handle Request Meal
    const handleRequestMeal = (_id) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Login Required",
                text: "Please login to request a meal.",
            });
            return;
        }
        if (dbUser?.badge === "bronze") {
            Swal.fire({
                icon: "warning",
                title: "Upgrade Required",
                text: "Bronze members cannot request meals. Please upgrade to Silver, Gold, or Platinum.",
                confirmButtonColor: "#5fbf54",
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
            likeCount: likeCount, // Use current state
            reviewCount: reviews.length, // Use current state
        };

        axios
            .post(
                "https://gurdian-care-server.vercel.app/mealRequests",
                request
            )
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Request Sent",
                    text: "We have received your meal request!",
                    confirmButtonColor: "#5fbf54",
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response?.data?.message || "Something went wrong",
                });
            });
    };

    // Handle Like
    const handleLike = (_id) => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to like this meal.",
            });
            return;
        }

        if (isLiked) return; // Prevent multiple likes locally

        setIsLiked(true);
        setLikeCount((prev) => prev + 1);

        axios
            .put(`https://gurdian-care-server.vercel.app/meals/${_id}`, {
                likeCount: likeCount + 1,
            })
            .catch(() => {
                setIsLiked(false);
                setLikeCount((prev) => prev - 1); // Revert on error
            });
    };

    // Handle Review Submit
    const handleReview = (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to write a review.",
            });
            return;
        }
        if (givenRating === 0) {
            Swal.fire({
                icon: "warning",
                title: "Rate Us",
                text: "Please select a star rating.",
            });
            return;
        }

        const text = e.target.reviewText.value;
        const newReview = {
            mealId: data?._id,
            userName: user?.displayName,
            userEmail: user?.email,
            rating: givenRating,
            text,
            postTime: new Date().toLocaleString(),
            profileImage: user?.photoURL,
            mealTitle: data?.title,
            likeCount: likeCount,
        };

        axios
            .post("https://gurdian-care-server.vercel.app/reviews", newReview)
            .then((res) => {
                if (res.data.insertedId) {
                    setReviews([
                        ...reviews,
                        { ...newReview, _id: res.data.insertedId },
                    ]); // Optimistic update
                    Swal.fire({
                        icon: "success",
                        title: "Review Posted",
                        text: "Thank you for your feedback!",
                        confirmButtonColor: "#5fbf54",
                    });
                    e.target.reset();
                    setGivenRating(0);
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        err.response?.data?.message || "Failed to post review",
                });
            });
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            {/* Top Section: Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                {/* Left: Image */}
                <div className="h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                    <img
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={data?.image}
                        alt={data?.title}
                    />
                </div>

                {/* Right: Info */}
                <div className="flex flex-col justify-center space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-[#5fbf54] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {data?.category || "Special Meal"}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500 text-sm">
                                <FaClock className="text-[#5fbf54]" />{" "}
                                {new Date(data?.postTime).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {data?.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <StarRatings
                                rating={data?.rating}
                                numberOfStars={5}
                                name="rating"
                                starRatedColor="#facc15"
                                starDimension="22px"
                                starSpacing="2px"
                            />
                            <span className="text-gray-400 text-sm">
                                ({reviews.length} Reviews)
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {data?.description}
                    </p>

                    {/* Distributor Info */}
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 w-max">
                        <div className="bg-white p-2 rounded-full shadow-sm text-[#5fbf54]">
                            <FaUserTie />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">
                                Distributor
                            </p>
                            <p className="font-semibold text-gray-800">
                                {data?.distributorName}
                            </p>
                        </div>
                    </div>

                    {/* Ingredients Tags */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <FaTags className="text-[#5fbf54]" /> Ingredients
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data?.ingredients?.map((ingredient, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm hover:border-[#5fbf54] hover:text-[#5fbf54] transition-colors cursor-default"
                                >
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-gray-400 text-sm font-medium">
                                Price per meal
                            </p>
                            <h2 className="text-4xl font-bold text-[#5fbf54]">
                                ${data?.price}
                            </h2>
                        </div>

                        <div className="flex gap-4 w-full sm:w-auto">
                            {/* Like Button */}
                            <button
                                onClick={() => handleLike(data?._id)}
                                disabled={isLiked}
                                className={`btn btn-circle btn-lg border-2 bg-white hover:bg-gray-50 ${
                                    isLiked
                                        ? "border-gray-300 text-gray-400"
                                        : "border-[#5fbf54] text-[#5fbf54]"
                                }`}
                            >
                                {isLiked ? (
                                    <AiFillLike size={28} />
                                ) : (
                                    <AiOutlineLike size={28} />
                                )}
                            </button>

                            {/* Request Button */}
                            <button
                                onClick={() => handleRequestMeal(data?._id)}
                                className="btn btn-lg bg-[#5fbf54] hover:bg-[#4da043] text-white border-none rounded-full px-8 flex-grow sm:flex-grow-0 shadow-lg shadow-green-200"
                            >
                                <MdFoodBank size={24} /> Request Meal
                            </button>
                        </div>
                        {isLiked && (
                            <p className="text-xs text-center sm:text-left text-gray-400 -mt-4 sm:mt-0 sm:hidden">
                                You liked this!
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <FaPenNib className="text-[#5fbf54]" /> Write a
                            Review
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Share your experience with this meal.
                        </p>

                        <form
                            onSubmit={handleReview}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                                <span className="text-sm font-bold text-gray-400 mb-2">
                                    Tap to Rate
                                </span>
                                <StarRatings
                                    rating={givenRating}
                                    changeRating={setGivenRating}
                                    numberOfStars={5}
                                    name="userRating"
                                    starRatedColor="#5fbf54"
                                    starHoverColor="#4da043"
                                    starDimension="30px"
                                    starSpacing="5px"
                                />
                            </div>

                            <textarea
                                required
                                name="reviewText"
                                rows={4}
                                className="textarea textarea-bordered w-full focus:outline-none focus:border-[#5fbf54] rounded-xl text-base"
                                placeholder="What did you like or dislike?"
                            ></textarea>

                            <button className="btn bg-[#5fbf54] hover:bg-[#4da043] text-white border-none w-full rounded-xl font-bold">
                                Post Review
                            </button>
                        </form>
                    </div>
                </div>

                {/* Review List */}
                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Customer Reviews{" "}
                        <span className="text-[#5fbf54]">
                            ({reviews.length})
                        </span>
                    </h3>

                    {loadingReviews ? (
                        <div className="text-center py-10">
                            <span className="loading loading-bars loading-md text-[#5fbf54]"></span>
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map((review) => (
                                <ReviewCard key={review._id} data={review} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
                            <p className="text-gray-500 font-medium">
                                No reviews yet. Be the first to review!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
