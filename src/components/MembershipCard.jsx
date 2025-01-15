const MembershipCard = ({ data }) => {
    return (
        <div className="bg-[#eef8ef] p-4 md:p-8 rounded-lg shadow-lg">
            <div className="flex justify-center items-center mb-4">
                <img
                    className="max-w-[100px] max-h-[100px]"
                    src={data.membershipIcon}
                    alt=""
                />
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-bold my-2">
                    {data.membershipType}
                </h1>

                <ul className="list-disc list-inside text-left my-4">
                    {data.benefits.map((benefit) => (
                        <li>{benefit}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between mt-4">
                <h1 className="text-4xl font-bold text-[#5fbf54]">
                    {data.price}$
                </h1>
                <button className="btn bg-[#5fbf54] text-white border-none">
                    Join Now
                </button>
            </div>
        </div>
    );
};

export default MembershipCard;
