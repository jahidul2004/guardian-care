import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Navigation এর জন্য
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
    const { login, setUser, googleLogin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    // Hooks for navigation (Optional but recommended)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Handle Email/Password Login
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                setUser(result.user);
                Swal.fire({
                    title: "Welcome Back!",
                    text: "Logged In successfully!",
                    icon: "success",
                    confirmButtonColor: "#5fbf54",
                });
                form.reset();
                setLoading(false);
                navigate(from, { replace: true }); // Redirect user
            })
            .catch((error) => {
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                setLoading(false);
            });
    };

    // Handle Google Login
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                setUser(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    password: "google_auth", // Placeholder
                    photoURL: result.user.photoURL,
                    role: "user",
                    badge: "bronze",
                };

                axios
                    .post(
                        "https://gurdian-care-server.vercel.app/users",
                        newUser
                    )
                    .then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Logged In with Google!",
                            icon: "success",
                            confirmButtonColor: "#5fbf54",
                        });
                        navigate(from, { replace: true });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Oops!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
                {/* Left Side: Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    {/* Back to Home Link */}
                    <Link
                        to="/"
                        className="absolute top-6 left-6 text-gray-400 hover:text-[#5fbf54] flex items-center gap-2 transition-colors"
                    >
                        <IoArrowBack /> Back to Home
                    </Link>

                    <div className="text-center md:text-left mb-8 mt-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <a
                                    href="#"
                                    className="text-xs font-semibold text-[#5fbf54] hover:underline"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#5fbf54] hover:bg-[#4da043] text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-[#5fbf54]/30"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="px-4 text-gray-400 text-sm font-medium">
                            OR
                        </span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                    >
                        <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            className="text-[#5fbf54] font-bold hover:underline"
                            to="/register"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* Right Side: Illustration Section */}
                <div className="w-full md:w-1/2 bg-[#eef8ef] flex items-center justify-center p-8 relative overflow-hidden">
                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#5fbf54] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5fbf54] opacity-10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10 w-full max-w-md">
                        <Lottie
                            loop={true}
                            animationData={loginLottie}
                            className="w-full h-auto drop-shadow-xl"
                        />
                        <div className="text-center mt-6 hidden md:block">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Caring Like a Guardian
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Join us today and experience the best care
                                services tailored just for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
