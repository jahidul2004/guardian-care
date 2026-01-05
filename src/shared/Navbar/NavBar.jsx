import { IoMdLogIn } from "react-icons/io";
import logo from "../../assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiHome9Line, RiMenuFill, RiCloseFill } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { MdOutlineDarkMode, MdOutlineUpcoming } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    // Fetch user role
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

    // Logout Handler
    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Logged out successfully!",
                    icon: "success",
                    confirmButtonColor: "#5fbf54",
                });
                setMenuOpen(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Active Link Styles
    const navLinkStyles = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            isActive
                ? "text-[#5fbf54] bg-[#5fbf54]/10 font-bold shadow-sm"
                : "text-gray-600 hover:text-[#5fbf54] hover:bg-gray-50"
        }`;

    const links = (
        <>
            <NavLink
                to="/"
                className={navLinkStyles}
                onClick={() => setMenuOpen(false)}
            >
                <RiHome9Line className="text-xl" />
                <span>Home</span>
            </NavLink>
            <NavLink
                to="/meals"
                className={navLinkStyles}
                onClick={() => setMenuOpen(false)}
            >
                <GiMeal className="text-xl" />
                <span>Meals</span>
            </NavLink>
            <NavLink
                to="/upcomingMeals"
                className={navLinkStyles}
                onClick={() => setMenuOpen(false)}
            >
                <MdOutlineUpcoming className="text-xl" />
                <span>Upcoming</span>
            </NavLink>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                        src={logo}
                        alt="Guardian Care Logo"
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                            Guardian<span className="text-[#5fbf54]">Care</span>
                        </span>
                        <span className="text-[10px] md:text-xs font-medium text-gray-500 tracking-widest uppercase">
                            Caring Always
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                    {links}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            {/* Notification Icon */}
                            <button className="hidden md:block relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                                <IoNotificationsCircleOutline size={26} />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* User Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar border border-[#5fbf54] p-0.5 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={
                                                user?.photoURL ||
                                                "https://i.ibb.co/T1b144R/placeholder.png"
                                            }
                                            alt="User"
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-xl w-60 border border-gray-100"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2 text-center">
                                        <p className="font-bold text-gray-800">
                                            {user?.displayName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <li>
                                        <Link
                                            to={
                                                dbUser?.role === "admin"
                                                    ? "/adminDashboard"
                                                    : "/dashboard/user"
                                            }
                                            className="font-medium hover:text-[#5fbf54] hover:bg-green-50 py-3"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="font-medium text-red-500 hover:bg-red-50 py-3 mt-1"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:flex items-center gap-2 bg-[#5fbf54] hover:bg-[#4da043] text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                        >
                            <IoMdLogIn size={20} />
                            <span>Join Us</span>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden text-3xl text-gray-700 p-1"
                    >
                        {menuOpen ? <RiCloseFill /> : <RiMenuFill />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown (Animated) */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="flex flex-col p-6 gap-4 items-center">
                    {/* Mobile Links */}
                    <div className="flex flex-col w-full gap-2">{links}</div>

                    {/* Mobile Auth Buttons */}
                    {!user && (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="w-full flex justify-center items-center gap-2 bg-[#5fbf54] text-white py-3 rounded-xl font-bold mt-4"
                        >
                            <IoMdLogIn size={20} />
                            Join Us
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
