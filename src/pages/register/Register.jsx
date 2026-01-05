import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaImage,
    FaArrowLeft,
} from "react-icons/fa";

const apiKye = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgApi = `https://api.imgbb.com/1/upload?key=${apiKye}`;

const Register = () => {
    const { registerUser, updateUser, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const file = form.image.files[0];

        try {
            // 1. Upload Image to ImgBB
            const formData = new FormData();
            formData.append("image", file);

            const imgRes = await axios.post(imgApi, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (!imgRes.data.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imgRes.data.data.url;

            // 2. Create User in Firebase
            const userCredential = await registerUser(email, password);
            const user = userCredential.user;

            // 3. Update User Profile in Firebase
            await updateUser(name, imageUrl);

            // 4. Save User to Database (MongoDB)
            const newUser = {
                name,
                email,
                password: "hashed_in_firebase", // Good practice not to send raw password if not needed
                photoURL: imageUrl,
                role: "user",
                badge: "bronze",
            };

            await axios.post(
                "https://gurdian-care-server.vercel.app/users",
                newUser
            );

            // 5. Update Context & UI
            setUser({ ...user, displayName: name, photoURL: imageUrl });

            Swal.fire({
                title: "Welcome!",
                text: "Registration successful!",
                icon: "success",
                confirmButtonColor: "#5fbf54",
            });

            form.reset();
            navigate("/"); // Redirect to Home
        } catch (error) {
            console.error("Registration Error:", error);
            Swal.fire({
                title: "Registration Failed",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
                {/* Left Side: Illustration Section */}
                <div className="w-full md:w-1/2 bg-[#eef8ef] flex flex-col items-center justify-center p-8 relative order-1 md:order-1">
                    <Link
                        to="/"
                        className="absolute top-6 left-6 text-gray-500 hover:text-[#5fbf54] transition-colors flex items-center gap-2"
                    >
                        <FaArrowLeft /> Home
                    </Link>

                    <div className="relative z-10 w-full max-w-md">
                        <Lottie
                            style={{ height: "100%" }}
                            loop={true}
                            animationData={loginLottie}
                            className="w-full h-auto drop-shadow-xl"
                        />
                        <div className="text-center mt-6 hidden md:block">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Join Our Community
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Create an account to access exclusive meal plans
                                and care services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-2">
                    <div className="text-center md:text-left mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-500">
                            Please fill in the details to register.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                            <FaUser className="absolute top-4 left-4 text-gray-400" />
                            <input
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* File Input */}
                        <div className="relative">
                            <FaImage className="absolute top-4 left-4 text-gray-400" />
                            <input
                                required
                                name="image"
                                type="file"
                                accept="image/*"
                                className="w-full pl-10 pr-5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5fbf54]/10 file:text-[#5fbf54] hover:file:bg-[#5fbf54]/20 cursor-pointer text-gray-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <FaLock className="absolute top-4 left-4 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#5fbf54] hover:bg-[#4da043] text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-[#5fbf54]/30 mt-4 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Creating Account...
                                </>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                className="text-[#5fbf54] font-bold hover:underline"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
