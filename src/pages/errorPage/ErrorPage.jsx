import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#f9f9f9]">
            <img
                className="rounded"
                src="https://i.ibb.co.com/3yLWwpKJ/404-error-page-animation-download-in-lottie-json-gif-static-svg-file-formats-not-found-web-the-ultim.webp"
                alt=""
            />
            <Link
                to="/"
                className="flex items-center gap-2 mt-6 px-6 py-3 bg-[#5fbf54] text-white rounded-lg transition"
            >
                <IoArrowBackCircleOutline />
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
