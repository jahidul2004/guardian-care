import StarRatings from "react-star-ratings";
import { FaQuoteRight } from "react-icons/fa"; // আইকনের জন্য (npm install react-icons)

const ReviewCard = ({ data }) => {
    // Destructuring data to handle potential undefined values
    const { userName, profileImage, text, rating, postTime } = data || {};

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden group">
            {/* Background Decorative Quote Icon */}
            <div className="absolute top-4 right-4 z-0">
                <FaQuoteRight className="text-6xl text-[#5fbf54] opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
            </div>

            <div className="flex gap-4 relative z-10">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img
                        className="w-14 h-14 rounded-full object-cover border-2 border-green-50 shadow-sm"
                        src={
                            profileImage ||
                            "https://i.ibb.co/T1b144R/placeholder.png"
                        } // Fallback image
                        alt={userName}
                    />
                </div>

                {/* Content Body */}
                <div className="flex-grow">
                    {/* Header: Name & Date */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                            <h1 className="font-bold text-gray-800 text-lg capitalize">
                                {userName}
                            </h1>
                            <p className="text-xs text-gray-400 font-medium">
                                {postTime}
                            </p>
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {text}
                    </p>

                    {/* Star Ratings */}
                    <div>
                        <StarRatings
                            rating={rating}
                            numberOfStars={5}
                            name="rating"
                            starRatedColor="#5fbf54"
                            starEmptyColor="#e5e7eb"
                            starDimension="18px"
                            starSpacing="2px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
