import { IoMdLogIn } from "react-icons/io";
import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiHome9Line } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { MdOutlineUpcoming } from "react-icons/md";

const NavBar = () => {
    const links = (
        <>
            <li>
                <NavLink to={"/"}>
                    <RiHome9Line />
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={"/meals"}>
                    <GiMeal />
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink to={"/upcoming"}>
                    <MdOutlineUpcoming />
                    Upcoming Meals
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-[1] flex justify-between items-center p-2">
            <div>
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <img className="w-[80px] h-[80px]" src={logo} alt="" />
                    <div className="flex flex-col">
                        <a className="text-2xl md:text-3xl font-bold">
                            Guardian{" "}
                            <span className="text-[#5fbf54]">Care</span>
                        </a>
                        <a className="hidden md:block font-semibold text-sm">
                            Caring Like a Guardian, Always
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="hidden md:flex">
                <IoNotificationsCircleOutline className="text-4xl mr-5 text-[#5fbf54] cursor-pointer" />
                <a className="btn bg-[#5fbf54] text-white hover:text-[#5fbf54]">
                    <IoMdLogIn />
                    Join With Us
                </a>
            </div>
        </div>
    );
};

export default NavBar;
