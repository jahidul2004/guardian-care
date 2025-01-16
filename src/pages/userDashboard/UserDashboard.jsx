import { CgProfile } from "react-icons/cg";
import { GiMeal } from "react-icons/gi";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlineReviews } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
    return (
        <div className="drawer drawer-mobile lg:drawer-open">
            {/* Drawer Toggle Checkbox */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center p-4">
                {/* Main Content */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn bg-[#5fbf54] text-white lg:hidden mb-4"
                >
                    Open Drawer
                </label>
                <Outlet />
            </div>
            <div className="drawer-side">
                {/* Drawer Overlay */}
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {/* Sidebar Content */}
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 font-semibold">
                    <li>
                        <Link to={"/dashboard/user/profile"}>
                            <CgProfile />
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={"/dashboard/user/requestedMeal"}>
                            <GiMeal />
                            Requested Meal
                        </Link>
                    </li>
                    <li>
                        <Link to={"/dashboard/user/myReview"}>
                            <MdOutlineReviews />
                            My Reviews
                        </Link>
                    </li>
                    <li>
                        <Link to={"/dashboard/user/paymentHistory"}>
                            <LuBadgeDollarSign />
                            Payment History
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
