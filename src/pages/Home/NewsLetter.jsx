import { useState } from "react";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa"; // react-icons না থাকলে সাধারণ টেক্সট বা SVG ব্যবহার করতে পারো

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email!",
                confirmButtonColor: "#5fbf54",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Subscribed!",
            text: "You have successfully subscribed to our newsletter.",
            confirmButtonColor: "#5fbf54",
        });
        setEmail("");
    };

    return (
        <section className="py-16 md:py-24 px-4">
            <div className="w-full max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-r from-[#5fbf54] to-[#4fa846] rounded-3xl shadow-2xl p-8 md:p-16 text-white">
                {/* Background Decorative Circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black opacity-5 blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Text Content */}
                    <div className="text-center lg:text-left lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Subscribe to our <br /> Newsletter
                        </h2>
                        <p className="text-green-50 text-base md:text-lg max-w-md mx-auto lg:mx-0 opacity-90">
                            Join our community to stay updated with the latest
                            health tips, offers, and news from Guardian Care.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30 flex shadow-lg"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow bg-transparent px-6 py-4 text-white placeholder-green-100 outline-none rounded-l-full w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-white text-[#5fbf54] hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 transform hover:scale-105 shadow-md"
                            >
                                <span>Subscribe</span>
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
