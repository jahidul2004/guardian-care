import { IoMdLogIn } from "react-icons/io";
import logo from "../../assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiHome9Line, RiMenuFill } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { MdOutlineUpcoming } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://gurdian-care-server.vercel.app/user/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setDbUser(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        } else {
            setDbUser(null);
            setIsLoading(false);
        }
    }, [user]);

    const links = (
        <>
            <li>
                <NavLink to={"/"} className="flex items-center gap-2">
                    <RiHome9Line />
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={"/meals"} className="flex items-center gap-2">
                    <GiMeal />
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/upcomingMeals"}
                    className="flex items-center gap-2"
                >
                    <MdOutlineUpcoming />
                    Upcoming Meals
                </NavLink>
            </li>
        </>
    );

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Log Out successfully!",
                    icon: "success",
                    confirmButtonText: "Close",
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
                    confirmButtonText: "Close",
                    customClass: {
                        confirmButton: "btn btn-error text-white border-none",
                    },
                });
            });
    };

    return (
        <div className="sticky top-0 z-10 navbar bg-base-100 shadow-md flex justify-between items-center p-3 lg:px-6">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
                <div className="flex flex-col">
                    <Link to="/" className="text-2xl md:text-3xl font-bold">
                        Guardian <span className="text-[#5fbf54]">Care</span>
                    </Link>
                    <p className="font-semibold text-xs md:text-sm">
                        Caring Like a Guardian, Always
                    </p>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-3xl"
                >
                    <RiMenuFill />
                </button>
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center">
                {isLoading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div>
                        <details className="dropdown mr-4">
                            <summary className="btn bg-white border-none shadow-none m-1">
                                <img
                                    className="h-[40px] w-[40px] rounded-full border-2 border-[#5fbf54] p-1 cursor-pointer"
                                    src={user?.photoURL}
                                    alt="User"
                                />
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow gap-2">
                                <p className="font-semibold text-[#5fbf54] text-center">
                                    {user?.displayName}
                                </p>
                                <li>
                                    <Link
                                        to={
                                            dbUser?.role === "admin"
                                                ? "/adminDashboard"
                                                : "/dashboard/user"
                                        }
                                        className="btn bg-[#5fbf54] text-white border-none"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
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
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col items-center space-y-3">
                    <ul className="menu flex flex-col space-y-2">{links}</ul>
                    {user ? (
                        <div className="flex flex-col items-center space-y-3">
                            <p className="font-semibold text-[#5fbf54]">
                                {user?.displayName}
                            </p>
                            <Link
                                to={
                                    dbUser?.role === "admin"
                                        ? "/adminDashboard"
                                        : "/dashboard/user"
                                }
                                className="btn bg-[#5fbf54] text-white border-none"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="btn btn-error text-white border-none"
                            >
                                Logout
                            </button>
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
                </div>
            )}
        </div>
    );
};

export default NavBar;
