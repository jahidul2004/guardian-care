import { useState } from "react";
import Swal from "sweetalert2";

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email!",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Subscribed!",
            text: "You have successfully subscribed to our newsletter.",
        });
        setEmail("");
    };

    return (
        <div className="w-[95%] my-10 rounded mx-auto bg-[#5fbf54] text-white py-12 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
                Subscribe to our Newsletter
            </h2>
            <p className="text-lg mb-6">
                Stay updated with our latest news and offers.
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row justify-center gap-2"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 text-black rounded-lg w-full sm:w-96 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="text-[#5fbf54] transition btn">
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsLetter;
