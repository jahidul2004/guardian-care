import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../context/AuthContext/AuthContext";
import {
    FaUserShield,
    FaEnvelope,
    FaCheckCircle,
    FaFingerprint,
} from "react-icons/fa";

const fetchUserData = async (email) => {
    const response = await fetch(
        `https://gurdian-care-server.vercel.app/user/${email}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    const {
        data: dbUser,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: () => fetchUserData(user?.email),
        enabled: !!user?.email,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-bars loading-lg text-[#5fbf54]"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
                <p className="text-xl font-bold">Error loading profile</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Cover */}
                <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-bold border border-white/20 flex items-center gap-2">
                        <FaUserShield /> Admin Panel Access
                    </div>
                </div>

                {/* Profile Info Wrapper */}
                <div className="px-8 pb-10 relative">
                    {/* Avatar Image (Overlapping) */}
                    <div className="relative -mt-20 mb-6 inline-block">
                        <div className="p-1.5 bg-white rounded-full">
                            <img
                                className="h-36 w-36 rounded-full object-cover border-4 border-[#5fbf54] shadow-lg"
                                src={
                                    dbUser?.photoURL ||
                                    "https://i.ibb.co/T1b144R/placeholder.png"
                                }
                                alt="Admin Profile"
                            />
                        </div>
                        {/* Verified Checkmark */}
                        <div
                            className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm"
                            title="Verified Admin"
                        >
                            <FaCheckCircle size={14} />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        {/* Name & Role */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                                {dbUser?.name || "Admin User"}
                            </h1>
                            <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                <FaEnvelope className="text-[#5fbf54]" />{" "}
                                {dbUser?.email}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div className="bg-green-50 px-6 py-3 rounded-xl border border-green-100 flex items-center gap-3">
                            <div className="bg-[#5fbf54] p-2 rounded-lg text-white">
                                <FaUserShield size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">
                                    Current Role
                                </p>
                                <p className="text-gray-800 font-bold capitalize">
                                    {dbUser?.role || "Administrator"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-8"></div>

                    {/* Additional Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">
                                Account ID
                            </p>
                            <div className="flex items-center gap-2 text-gray-700 font-mono font-semibold">
                                <FaFingerprint className="text-gray-400" />
                                {dbUser?._id?.slice(-8).toUpperCase() || "N/A"}
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">
                                Access Level
                            </p>
                            <span className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-sm font-bold border border-purple-200">
                                Super Admin
                            </span>
                        </div>

                        {/* Card 3 */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">
                                Status
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-gray-700 font-bold">
                                    Active Now
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
