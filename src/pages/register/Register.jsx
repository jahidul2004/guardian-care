import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import axios from "axios";

const apiKye = import.meta.env.VITE_IMAGEBB_API_KEY;
const imgApi = `https://api.imgbb.com/1/upload?key=${apiKye}`;

const Register = () => {
    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const file = e.target.image.files[0];

        if (!file) {
            console.error("No file selected for upload!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(imgApi, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageUrl = res.data.data.url;
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-10">
            <div className="order-2 card bg-base-100 w-full md:w-[70%] shrink-0 shadow-2xl mx-auto">
                <h1 className="text-center text-2xl md:text-3xl font-bold my-4 text-[#5fbf54]">
                    Register
                </h1>
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Picture</span>
                        </label>
                        <input
                            name="image"
                            type="file"
                            className="file:bg-[#5fbf54] file:border-none file:text-white file-input file-input-bordered text-[#5fbf54] w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-[#5fbf54] text-white border-none">
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div className="max-h-[500px] w-full order-1">
                <Lottie
                    style={{ height: "100%" }}
                    loop={true}
                    animationData={loginLottie}
                />
            </div>
        </div>
    );
};

export default Register;
