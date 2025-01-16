import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-10">
            <div className="order-2 card bg-base-100 w-full md:w-[70%] shrink-0 shadow-2xl mx-auto">
                <h1 className="text-center text-2xl md:text-3xl font-bold my-4 text-[#5fbf54]">
                    Register
                </h1>
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="text"
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
                            type="file"
                            className="file-input file-input-bordered text-[#5fbf54] w-full"
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
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-[#5fbf54] text-white border-none">
                            Login
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
