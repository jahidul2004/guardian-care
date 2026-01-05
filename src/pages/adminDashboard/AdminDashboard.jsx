import { CgProfile } from "react-icons/cg";
import { GiHotMeal } from "react-icons/gi";
import { GrUserSettings } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";
import {
    MdOutlineReviews,
    MdDashboard,
    MdOutlineWatchLater,
} from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { FaHome, FaUsersCog } from "react-icons/fa"; // Updated icons
import { Link, Outlet, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png"; // লোগো পাথ ঠিক থাকলে পাবে

const AdminDashboard = () => {
    // Custom Style for NavLinks (Same as User Dashboard for consistency)
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
                {/* Mobile Header */}
                <div className="w-full bg-white shadow-sm border-b border-gray-100 lg:hidden p-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <img className="w-8 h-8" src={logo} alt="Logo" />
                        <span className="font-bold text-gray-800">
                            Guardian Admin
                        </span>
                    </div>
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-ghost btn-circle text-[#5fbf54]"
                    >
                        <RiMenu2Fill size={24} />
                    </label>
                </div>

                {/* Dashboard Outlet */}
                <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="drawer-side z-30">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <aside className="bg-white min-h-full w-72 flex flex-col border-r border-gray-100 shadow-xl lg:shadow-none">
                    {/* Sidebar Header */}
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
                        <div className="px-3 py-1 bg-green-50 text-[#5fbf54] text-xs font-bold rounded-full uppercase tracking-widest mt-1">
                            Admin Panel
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-200">
                        <ul className="space-y-2">
                            {/* Dashboard Home */}
                            <li>
                                <NavLink
                                    to="/adminDashboard"
                                    end
                                    className={navLinkClasses}
                                >
                                    <MdDashboard className="text-xl" />
                                    <span>Admin Home</span>
                                </NavLink>
                            </li>

                            {/* Admin Profile */}
                            <li>
                                <NavLink
                                    to="profile"
                                    className={navLinkClasses}
                                >
                                    <CgProfile className="text-xl" />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>

                            <div className="divider my-2 text-xs text-gray-400 font-semibold">
                                MANAGEMENT
                            </div>

                            {/* Manage User */}
                            <li>
                                <NavLink
                                    to="manageUser"
                                    className={navLinkClasses}
                                >
                                    <FaUsersCog className="text-xl" />{" "}
                                    {/* Better Icon */}
                                    <span>Manage Users</span>
                                </NavLink>
                            </li>

                            {/* Add Meal */}
                            <li>
                                <NavLink
                                    to="addMeal"
                                    className={navLinkClasses}
                                >
                                    <IoAddCircleOutline className="text-xl" />
                                    <span>Add Meal</span>
                                </NavLink>
                            </li>

                            {/* All Meals */}
                            <li>
                                <NavLink
                                    to="allMeal"
                                    className={navLinkClasses}
                                >
                                    <GiHotMeal className="text-xl" />
                                    <span>All Meals</span>
                                </NavLink>
                            </li>

                            {/* Serve Meals */}
                            <li>
                                <NavLink
                                    to="serveMeal"
                                    className={navLinkClasses}
                                >
                                    <LuChefHat className="text-xl" />
                                    <span>Serve Meals</span>
                                </NavLink>
                            </li>

                            {/* Upcoming Meals */}
                            <li>
                                <NavLink
                                    to="upcomingMeal"
                                    className={navLinkClasses}
                                >
                                    <MdOutlineWatchLater className="text-xl" />
                                    <span>Upcoming Meals</span>
                                </NavLink>
                            </li>

                            {/* All Reviews */}
                            <li>
                                <NavLink
                                    to="allReview"
                                    className={navLinkClasses}
                                >
                                    <MdOutlineReviews className="text-xl" />
                                    <span>All Reviews</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-[#5fbf54] text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                        >
                            <FaHome />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminDashboard;
