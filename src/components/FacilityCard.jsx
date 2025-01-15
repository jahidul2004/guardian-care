const FacilityCard = ({ title, img }) => {
    return (
        <div
            className="hero h-[250px] rounded-lg overflow-hidden"
            style={{
                backgroundImage: `url(${img})` || "https://source.unsplash.com/random",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '12px',
                WebkitBackgroundClip: 'padding-box',
                backgroundClip: 'padding-box'
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-3xl font-bold">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default FacilityCard;
