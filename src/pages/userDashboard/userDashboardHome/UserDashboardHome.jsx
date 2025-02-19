import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const UserDashboardHome = () => {
    const data = [
        { name: "French Toast", price: 7.49 },
        { name: "French Burger", price: 16 },
        { name: "Kacci", price: 25 },
        { name: "Biriyani", price: 24 },
        { name: "Khicuri", price: 12 },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#eef8ef] h-[400px] w-[600px]">
                <LineChart width={600} height={400} data={data}>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </div>
            <div></div>
        </div>
    );
};

export default UserDashboardHome;
