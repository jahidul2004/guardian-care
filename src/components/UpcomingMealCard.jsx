const UpcomingMealCard = ({ data }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={data?.image}
                    alt="Shoes"
                    className="w-full h-[250px] object-cover"
                />
            </figure>
            <div className="card-body text-left">
                <div className="flex items-center gap-4">
                    <h2 className="card-title text-2xl">{data?.title}</h2>
                    <span className="border rounded-2xl px-2 border-error font-semibold">
                        Coming Soon
                    </span>
                </div>
                <p>{data?.description}</p>
            </div>
        </div>
    );
};

export default UpcomingMealCard;
