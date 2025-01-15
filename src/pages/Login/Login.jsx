import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie/login.json";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-10">
            <div className="order-2 md:order-1 card bg-base-100 w-full md:w-[70%] shrink-0 shadow-2xl mx-auto">
                <h1 className="text-center text-2xl md:text-3xl font-bold my-4 text-[#5fbf54]">
                    Login
                </h1>
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            required
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
                        <br />
                        <span className="text-center">or</span>
                        <br />
                        <button className="btn bg-[#5fbf54] text-white border-none">
                            <FcGoogle />
                            Login With Google
                        </button>
                    </div>
                </form>
            </div>
            <div className="max-h-[500px] w-full order-1 md:order-2">
                <Lottie
                    style={{ height: "100%" }}
                    loop={true}
                    animationData={loginLottie}
                />
            </div>
        </div>
    );
};

export default Login;
