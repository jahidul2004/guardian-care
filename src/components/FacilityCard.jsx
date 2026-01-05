const FacilityCard = ({ title, img }) => {
    return (
        <div className="relative h-[280px] w-full rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
            {/* Background Image with Zoom Animation */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                    backgroundImage: `url(${img})`,
                }}
            ></div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

            {/* Content Centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg leading-tight">
                    {title}
                </h1>

                {/* Decorative Line (Expands on Hover) */}
                <div className="w-0 h-1 bg-[#5fbf54] rounded-full mt-4 transition-all duration-500 group-hover:w-16"></div>
            </div>
        </div>
    );
};

export default FacilityCard;
