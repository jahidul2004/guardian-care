import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // আইকনের জন্য

const MembershipCard = ({ data }) => {
    return (
        <div className="relative flex flex-col p-6 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group h-full">
            {/* Top Green Accent Line */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#5fbf54] rounded-t-3xl opacity-80"></div>

            {/* Icon & Title Section */}
            <div className="text-center mb-6 mt-2">
                <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img
                        className="w-10 h-10 object-contain"
                        src={data.membershipIcon}
                        alt={data.membershipType}
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                    {data.membershipType}
                </h1>
            </div>

            {/* Price Section */}
            <div className="text-center mb-8">
                <div className="flex justify-center items-baseline">
                    <span className="text-xl text-gray-500 font-medium mr-1">
                        $
                    </span>
                    <span className="text-5xl font-extrabold text-[#5fbf54] tracking-tight">
                        {data.price}
                    </span>
                </div>
                <p className="text-gray-400 text-sm mt-2 font-medium">
                    Per Lifetime / Year
                </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 w-full mb-6"></div>

            {/* Benefits List (Flex grow pushes button to bottom) */}
            <ul className="space-y-4 mb-8 flex-grow text-left">
                {data.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                        <FaCheckCircle className="text-[#5fbf54] mt-1 mr-3 flex-shrink-0 text-lg" />
                        <span className="text-sm md:text-base font-medium leading-relaxed">
                            {benefit}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Action Button */}
            <Link
                to={`/payment/${data._id}`}
                className="w-full block text-center bg-gray-800 hover:bg-[#5fbf54] text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
            >
                Join Now
            </Link>
        </div>
    );
};

export default MembershipCard;
