import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const MealCard = ({ data }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={data?.image}
                    alt="Shoes"
                    className="w-full h-[250px] object-cover"
                />
            </figure>
            <div className="card-body text-left">
                <h2 className="card-title text-2xl">{data?.title}</h2>
                <p>{data?.description}</p>
                <StarRatings
                    rating={data?.rating}
                    numberOfStars={5}
                    name="rating"
                    starRatedColor="#5fbf54"
                    starDimension="20px"
                />
                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-2xl font-bold text-[#5fbf54]">
                        {data?.price}$
                    </h1>
                    <Link
                        to={`/meals/${data?._id}`}
                        className="btn bg-[#5fbf54] text-white border-none"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
