import { IoMdLogIn } from "react-icons/io";
import logo from "../../assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiHome9Line, RiMenuFill } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { MdOutlineUpcoming } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
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
        <div className="navbar bg-base-100 shadow-md flex justify-between items-center p-2">
            <div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <RiMenuFill className="text-5xl text-[#5fbf54] border-[#5fbf54] border-2 rounded p-1" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                        {user ? (
                            <div>
                                <details className="dropdown">
                                    <summary className="btn my-2 mb-4 bg-white border-none shadow-none m-1">
                                        <img
                                            className="h-[40px] w-[40px] rounded-full border-2 border-[#5fbf54] p-1 cursor-pointer"
                                            src={user?.photoURL}
                                            alt=""
                                        />
                                        <p className="font-semibold text-[#5fbf54] text-center">
                                            {user?.displayName}
                                        </p>
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow gap-2">
                                        <li>
                                            <Link
                                                to={"dashboard"}
                                                className="btn bg-[#5fbf54] text-white border-none"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    logout()
                                                        .then(() => {
                                                            Swal.fire({
                                                                title: "Success!",
                                                                text: "Log Out successfully!",
                                                                icon: "success",
                                                                confirmButtonText:
                                                                    "Close",
                                                                customClass: {
                                                                    confirmButton:
                                                                        "btn bg-[#5fbf54] text-white border-none",
                                                                },
                                                            });
                                                        })
                                                        .catch((error) => {
                                                            Swal.fire({
                                                                title: "Oops!",
                                                                text: error.message,
                                                                icon: "error",
                                                                confirmButtonText:
                                                                    "Close",
                                                                customClass: {
                                                                    confirmButton:
                                                                        "btn btn-error text-white border-none",
                                                                },
                                                            });
                                                        });
                                                }}
                                                className="btn btn-error text-white border-none"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </details>
                            </div>
                        ) : (
                            <Link
                                to={"/login"}
                                className="btn bg-[#5fbf54] text-white hover:text-[#5fbf54]"
                            >
                                <IoMdLogIn />
                                Join With Us
                            </Link>
                        )}
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <img className="w-[80px] h-[80px]" src={logo} alt="" />
                    <div className="flex flex-col">
                        <a className="text-2xl md:text-3xl font-bold">
                            Guardian{" "}
                            <span className="text-[#5fbf54]">Care</span>
                        </a>
                        <a className="font-semibold text-xs md:text-sm">
                            Caring Like a Guardian, Always
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="hidden md:flex">
                {user ? (
                    <div>
                        <details className="dropdown">
                            <summary className="btn bg-white border-none shadow-none m-1">
                                <img
                                    className="h-[40px] w-[40px] rounded-full border-2 border-[#5fbf54] p-1 cursor-pointer"
                                    src={user?.photoURL}
                                    alt=""
                                />
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow gap-2">
                                <p className="font-semibold text-[#5fbf54] text-center">
                                    {user?.displayName}
                                </p>

                                <li>
                                    <Link
                                        to={"dashboard"}
                                        className="btn bg-[#5fbf54] text-white border-none"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            logout()
                                                .then(() => {
                                                    Swal.fire({
                                                        title: "Success!",
                                                        text: "Log Out successfully!",
                                                        icon: "success",
                                                        confirmButtonText:
                                                            "Close",
                                                        customClass: {
                                                            confirmButton:
                                                                "btn bg-[#5fbf54] text-white border-none",
                                                        },
                                                    });
                                                })
                                                .catch((error) => {
                                                    Swal.fire({
                                                        title: "Oops!",
                                                        text: error.message,
                                                        icon: "error",
                                                        confirmButtonText:
                                                            "Close",
                                                        customClass: {
                                                            confirmButton:
                                                                "btn btn-error text-white border-none",
                                                        },
                                                    });
                                                });
                                        }}
                                        className="btn btn-error text-white border-none"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </div>
                ) : (
                    <Link
                        to={"/login"}
                        className="btn bg-[#5fbf54] text-white hover:text-[#5fbf54]"
                    >
                        <IoMdLogIn />
                        Join With Us
                    </Link>
                )}

                <IoNotificationsCircleOutline className="text-4xl ml-5 text-[#5fbf54] cursor-pointer" />
            </div>
        </div>
    );
};

export default NavBar;
