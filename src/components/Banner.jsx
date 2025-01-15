import bannerImg from "../assets/images/banner.jpg";

const Banner = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${bannerImg})`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold">
                        Compassion Meets Commitment
                    </h1>
                    <p className="mb-5 text-xs md:text-sm lg:text-base">
                        Guardian Care is your dedicated partner in delivering
                        personalized care solutions that bring peace of mind and
                        a brighter tomorrow.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-2">
                        <label className="bg-[#5fbf540e] input input-bordered flex items-center gap-2 border-[#5fbf54]">
                            <input
                                type="text"
                                className="grow text-[#5fbf54] placeholder-[#5fbf54] bg-[#5fbf54] bg-opacity-10"
                                placeholder="Search"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                        <button className="btn w-max mx-auto md:mx-0 bg-[#5fbf54] text-white border-none">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
