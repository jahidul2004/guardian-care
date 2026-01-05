import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";

const UserDashboardHome = () => {
    const [greeting, setGreeting] = useState("Good Day");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getGreeting = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 12) {
                setGreeting("Good Morning");
            } else if (hour >= 12 && hour < 17) {
                setGreeting("Good Afternoon");
            } else if (hour >= 17 && hour < 21) {
                setGreeting("Good Evening");
            } else {
                setGreeting("Good Night");
            }
        };

        getGreeting();
    }, []);

    const pieData = [
        { name: "Completed", value: 400 },
        { name: "Pending", value: 300 },
        { name: "In Progress", value: 300 },
    ];

    const COLORS = ["#5fbf54", "#ffbb28", "#ff8042"];

    const lineData = [
        { name: "Jan", uv: 400 },
        { name: "Feb", uv: 300 },
        { name: "Mar", uv: 200 },
        { name: "Apr", uv: 278 },
        { name: "May", uv: 189 },
    ];

    return (
        <div className="w-full p-4">
            <div>
                <h1 className="text-left text-3xl font-bold text-[#5fbf54]">
                    {greeting}, {user?.displayName}
                </h1>
                <p className="mt-2 font-semibold text-gray-600">{user?.email}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">


                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-center text-[#5fbf54]">My Activity Overview</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineData}>
                            <Line type="monotone" dataKey="uv" stroke="#5fbf54" strokeWidth={3} />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-center text-[#5fbf54]">Meal Status</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <Link to={"/meals"} className="btn btn-success text-white">Request For New Meal</Link>
                <Link to={"/"} className="btn btn-error text-white">Explore Membership</Link>
                <Link to={"/dashboard/user/profile"} className="btn btn-warning text-white">Your Membership Status</Link>
            </div>
        </div>
    );
};

export default UserDashboardHome;
