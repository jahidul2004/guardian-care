import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const MealCard = ({ data }) => {
    const { title, image, description, rating, price, _id, category } =
        data || {};

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full">
            {/* Image Container with Zoom Effect */}
            <div className="relative overflow-hidden h-60 w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category Badge (Optional: if category exists) */}
                {category && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#5fbf54] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {category}
                    </span>
                )}

                {/* Overlay on hover (Optional for better focus) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-grow text-left">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#5fbf54] transition-colors line-clamp-1">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                        {description}
                    </p>

                    {/* Rating Component */}
                    <div className="mb-4">
                        <StarRatings
                            rating={rating}
                            numberOfStars={5}
                            name="rating"
                            starRatedColor="#5fbf54"
                            starEmptyColor="#e5e7eb" // Gray color for empty stars
                            starDimension="18px"
                            starSpacing="2px"
                        />
                    </div>
                </div>

                {/* Footer: Price & Button */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <div>
                        <span className="text-xs text-gray-400 font-medium block">
                            Price
                        </span>
                        <h1 className="text-2xl font-bold text-[#5fbf54]">
                            ${price}
                        </h1>
                    </div>
                    <Link
                        to={`/meals/${_id}`}
                        className="bg-[#5fbf54] hover:bg-[#4da043] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
