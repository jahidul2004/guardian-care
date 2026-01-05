import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { FaMedal, FaEnvelope, FaUserEdit, FaCalendarAlt } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://gurdian-care-server.vercel.app/user/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setDbUser(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user data:", err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // Helper to get badge styling based on tier
    const getBadgeStyle = (badge) => {
        const tier = badge?.toLowerCase();
        switch (tier) {
            case "gold":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "platinum":
                return "bg-purple-100 text-purple-700 border-purple-300";
            case "silver":
                return "bg-gray-100 text-gray-700 border-gray-300";
            case "bronze":
                return "bg-orange-100 text-orange-800 border-orange-300";
            default:
                return "bg-green-100 text-green-700 border-green-300";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-dots loading-lg text-[#5fbf54]"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            {/* Main Profile Card */}
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
                {/* Cover Background */}
                <div className="h-40 md:h-52 bg-gradient-to-r from-[#5fbf54] to-[#4fa846] relative">
                    {/* Decorative pattern/overlay */}
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Profile Content */}
                <div className="px-6 md:px-10 pb-10 relative">
                    {/* Avatar Wrapper (Overlapping the cover) */}
                    <div className="relative -mt-16 md:-mt-20 mb-6 flex justify-center md:justify-start">
                        <div className="relative">
                            <img
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                src={
                                    user?.photoURL ||
                                    "https://i.ibb.co/T1b144R/placeholder.png"
                                }
                                alt="User Profile"
                            />
                            {/* Edit Icon (Visual only) */}
                            <button className="absolute bottom-2 right-2 bg-white text-gray-600 p-2 rounded-full shadow-md hover:text-[#5fbf54] transition-colors border border-gray-100">
                                <FaUserEdit />
                            </button>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        {/* Name & Email */}
                        <div className="text-center md:text-left w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-1">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {user?.displayName || "Guardian User"}
                                </h1>

                                {/* Badge Display */}
                                {dbUser?.badge && (
                                    <div
                                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getBadgeStyle(
                                            dbUser.badge
                                        )} mb-1 md:mb-2`}
                                    >
                                        <FaMedal />
                                        {dbUser.badge} Member
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                                <FaEnvelope className="text-[#5fbf54]" />
                                <span>{user?.email}</span>
                            </div>
                        </div>

                        {/* Action Button (Optional) */}
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <button className="w-full md:w-auto bg-gray-800 hover:bg-[#5fbf54] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-8"></div>

                    {/* Stats / Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Role */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                                Account Type
                            </p>
                            <p className="text-gray-800 font-bold text-lg capitalize">
                                {dbUser?.role || "User"}
                            </p>
                        </div>

                        {/* Card 2: Status */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                                Membership Status
                            </p>
                            <p className="text-[#5fbf54] font-bold text-lg">
                                Active
                            </p>
                        </div>

                        {/* Card 3: Joined Date (Mock or Real if available) */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                                Joined Date
                            </p>
                            <div className="flex items-center justify-center gap-2 text-gray-800 font-bold text-lg">
                                <FaCalendarAlt className="text-gray-400 text-sm" />
                                <span>
                                    {user?.metadata?.creationTime
                                        ? new Date(
                                              user.metadata.creationTime
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
