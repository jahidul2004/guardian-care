import { IoArrowBack, IoHome } from "react-icons/io5";
import { Link, useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-[#5fbf54] selection:text-white">
            {/* Background Decorative Shapes (Soft Glows) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-96 h-96 rounded-full bg-[#5fbf54] opacity-[0.03] blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 rounded-full bg-[#5fbf54] opacity-[0.05] blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* 404 Large Background Text */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[220px] font-black text-gray-100 leading-none select-none">
                        404
                    </h1>

                    {/* Main Error Message (Overlapping) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                            Page Not Found
                        </h2>
                        <div className="h-1 w-20 bg-[#5fbf54] mx-auto rounded-full mb-4"></div>
                    </div>
                </div>

                {/* Error Description */}
                <div className="max-w-lg mx-auto -mt-6 md:-mt-10">
                    <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                        {error?.statusText ||
                            error?.message ||
                            "Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#5fbf54] hover:bg-[#4da043] text-white font-bold rounded-xl shadow-lg shadow-green-200/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <IoHome size={20} />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-gray-100 hover:border-[#5fbf54] text-gray-600 hover:text-[#5fbf54] font-bold rounded-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <IoArrowBack size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-8 w-full text-center">
                <p className="text-gray-400 text-xs font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} Guardian Care. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
