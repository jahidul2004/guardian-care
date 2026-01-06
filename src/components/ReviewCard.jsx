import StarRatings from "react-star-ratings";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ data }) => {
    // Destructuring data to handle potential undefined values
    const { userName, profileImage, text, rating, postTime } = data || {};

    // Helper to format date nicely
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return isNaN(date.getTime())
            ? dateString // If invalid date, return original string
            : date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
            {/* Background Decorative Quote Icon */}
            <div className="absolute top-4 right-4 z-0">
                <FaQuoteRight className="text-6xl text-[#5fbf54] opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
            </div>

            <div className="flex gap-4 relative z-10 h-full">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-green-50 shadow-sm"
                        src={
                            profileImage ||
                            "https://i.ibb.co/T1b144R/placeholder.png"
                        }
                        alt={userName}
                    />
                </div>

                {/* Content Body */}
                <div className="flex-grow flex flex-col">
                    {/* Header: Name & Date */}
                    <div className="mb-2">
                        <h1 className="font-bold text-gray-800 text-base md:text-lg capitalize leading-tight">
                            {userName || "Anonymous User"}
                        </h1>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            {formatDate(postTime)}
                        </p>
                    </div>

                    {/* Review Text (Flex grow pushes stars to bottom if needed) */}
                    <div className="flex-grow mb-3">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                            {text}
                        </p>
                    </div>

                    {/* Star Ratings */}
                    <div className="mt-auto">
                        <StarRatings
                            rating={rating || 0}
                            numberOfStars={5}
                            name="rating"
                            starRatedColor="#5fbf54"
                            starEmptyColor="#e5e7eb"
                            starDimension="16px"
                            starSpacing="2px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
