import { GrCommand } from "react-icons/gr";
import { SiComma } from "react-icons/si";
import StarRatings from "react-star-ratings";

const ReviewCard = ({ data }) => {
    return (
        <div className="bg-[#5fbf541c] rounded-lg flex relative">
            <div className="bg-[#5fbf54] h-full p-1 w-full md:w-2/5 rounded-l-lg flex flex-col justify-center items-center gap-2 py-5">
                <img
                    className="w-[60px] h-[60px] rounded-full border-2 p-1 border-white"
                    src={data?.profileImage}
                    alt=""
                />
                <h1 className="font-semibold">{data?.userName}</h1>
            </div>
            <div className="w-full md:w-3/5 rounded-r-lg p-2">
                <p className="">{data.text}</p>
                <StarRatings
                    rating={data?.rating}
                    numberOfStars={5}
                    name="rating"
                    starRatedColor="#5fbf54"
                    starDimension="20px"
                />
            </div>

            <p className="absolute bottom-1 right-1 text-xs">
                {data?.postTime}
            </p>
        </div>
    );
};

export default ReviewCard;
