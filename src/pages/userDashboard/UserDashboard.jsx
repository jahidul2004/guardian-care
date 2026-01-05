import { CgProfile } from "react-icons/cg";
import { GiMeal } from "react-icons/gi";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlineReviews, MdDashboard } from "react-icons/md"; // Dashboard icon added
import { FaHome } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, Outlet, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png"; // লোগো ইমপোর্ট করা হলো (যদি থাকে)

const UserDashboard = () => {
    // Custom Style for NavLinks
    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
            isActive
                ? "bg-[#5fbf54] text-white shadow-md shadow-green-200"
                : "text-gray-600 hover:bg-green-50 hover:text-[#5fbf54]"
        }`;

    return (
        <div className="drawer lg:drawer-open bg-gray-50 min-h-screen font-sans">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="w-full bg-white shadow-sm border-b border-gray-100 lg:hidden p-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <img className="w-8 h-8" src={logo} alt="Logo" />
                        <span className="font-bold text-gray-800">
                            Guardian Care
                        </span>
                    </div>
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-ghost btn-circle text-[#5fbf54]"
                    >
                        <RiMenu2Fill size={24} />
                    </label>
                </div>

                {/* Dashboard Content Outlet */}
                <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="drawer-side z-30">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <aside className="bg-white min-h-full w-72 flex flex-col border-r border-gray-100 shadow-xl lg:shadow-none">
                    {/* Sidebar Header/Logo */}
                    <div className="p-6 flex flex-col items-center border-b border-gray-100">
                        <Link to="/" className="flex items-center gap-2 mb-1">
                            <img
                                className="w-10 h-10 object-contain"
                                src={logo}
                                alt="Logo"
                            />
                            <span className="text-xl font-bold text-gray-800">
                                Guardian{" "}
                                <span className="text-[#5fbf54]">Care</span>
                            </span>
                        </Link>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                            User Dashboard
                        </span>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="flex-1 px-4 py-6 space-y-2">
                        {/* Dashboard Home */}
                        <li>
                            <NavLink
                                to="/dashboard/user"
                                end
                                className={navLinkClasses}
                            >
                                <MdDashboard className="text-xl" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        {/* My Profile */}
                        <li>
                            <NavLink to="profile" className={navLinkClasses}>
                                <CgProfile className="text-xl" />
                                <span>My Profile</span>
                            </NavLink>
                        </li>

                        {/* Requested Meal */}
                        <li>
                            <NavLink
                                to="requestedMeal"
                                className={navLinkClasses}
                            >
                                <GiMeal className="text-xl" />
                                <span>Requested Meals</span>
                            </NavLink>
                        </li>

                        {/* My Reviews */}
                        <li>
                            <NavLink to="myReview" className={navLinkClasses}>
                                <MdOutlineReviews className="text-xl" />
                                <span>My Reviews</span>
                            </NavLink>
                        </li>

                        {/* Payment History */}
                        <li>
                            <NavLink
                                to="paymentHistory"
                                className={navLinkClasses}
                            >
                                <LuBadgeDollarSign className="text-xl" />
                                <span>Payment History</span>
                            </NavLink>
                        </li>
                    </ul>

                    {/* Sidebar Footer (Go Home) */}
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-[#5fbf54] text-gray-600 hover:text-white py-3 rounded-xl transition-all duration-300 font-semibold group"
                        >
                            <FaHome className="group-hover:scale-110 transition-transform" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default UserDashboard;
