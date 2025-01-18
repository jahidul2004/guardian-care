import { CgProfile } from "react-icons/cg";
import { GiHotMeal } from "react-icons/gi";
import { GrUserSettings } from "react-icons/gr";
import { IoAddCircleOutline, IoArrowBackSharp } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";
import { MdOutlineReviews, MdOutlineWatchLater } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <h1 className="pl-2 text-3xl font-bold mb-5 text-[#5fbf54]">
                        Welcome to admin Dashboard
                    </h1>
                    <li>
                        <Link to={"profile"}>
                            <CgProfile />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={"manageUser"}>
                            <GrUserSettings />
                            Manage User
                        </Link>
                    </li>
                    <li>
                        <Link to={"addMeal"}>
                            <IoAddCircleOutline />
                            Add Meal
                        </Link>
                    </li>
                    <li>
                        <Link to={"allMeal"}>
                            <GiHotMeal />
                            All Meal
                        </Link>
                    </li>
                    <li>
                        <Link to={"allReview"}>
                            <MdOutlineReviews />
                            All Review
                        </Link>
                    </li>
                    <li>
                        <Link to={"serveMeal"}>
                            <LuChefHat />
                            Serve Meal
                        </Link>
                    </li>
                    <li>
                        <Link to={"upcomingMeal"}>
                            <MdOutlineWatchLater />
                            Upcoming Meal
                        </Link>
                    </li>
                    <Link
                        className="mt-2 btn bg-[#5fbf54] text-white border-none"
                        to={"/"}
                    >
                        <IoArrowBackSharp />
                        Go to Home
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
