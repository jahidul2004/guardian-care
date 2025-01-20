import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () =>
            fetch("http://localhost:3000/dashboard")
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                }),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-5 bg-[#5fbf54] p-4 rounded-md text-white">
                Welcome to Admin Home
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalMealRequests}
                    </h1>
                    <p className="text-xl font-bold">Total Meal Requests</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2 md:col-span-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalUsers}
                    </h1>
                    <p className="text-xl font-bold">Total User</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalMeals}
                    </h1>
                    <p className="text-xl font-bold">Total Meals</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalMemberships}
                    </h1>
                    <p className="text-xl font-bold">Total Memberships</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalReviews}
                    </h1>
                    <p className="text-xl font-bold">Total Reviews</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2 md:col-span-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalTransactions}
                    </h1>
                    <p className="text-xl font-bold">Total Transactions</p>
                </div>
                <div className="bg-[#5fbf54] text-white p-5 rounded-md text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[50px] h-[50px] border-2 flex justify-center items-center rounded-full text-2xl font-bold">
                        {data?.totalUpcomingMeals}
                    </h1>
                    <p className="text-xl font-bold">Upcoming Meals</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
