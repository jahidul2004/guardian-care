import { Link } from "react-router-dom";

const MealCard = ({ data }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={data.image}
                    alt="Shoes"
                    className="w-full h-[250px] object-cover"
                />
            </figure>
            <div className="card-body text-left">
                <h2 className="card-title text-2xl">{data.title}</h2>
                <p className="font-semibold">Rating:{data.rating}</p>
                <p className="font-semibold">Price:{data.price}$</p>
                <div className="card-actions justify-end">
                    <Link
                        to={`meal/${data.id}`}
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
