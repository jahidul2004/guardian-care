import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { Link } from "react-router-dom";
import {
    FaUsers,
    FaUtensils,
    FaMoneyBillWave,
    FaComments,
    FaClipboardList,
    FaStar,
    FaHourglassHalf,
} from "react-icons/fa";

const AdminHome = () => {
    const { user } = useContext(AuthContext);

    // Fetch Dashboard Data
    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () =>
            fetch("https://gurdian-care-server.vercel.app/dashboard")
                .then((res) => res.json())
                .catch((err) => console.error(err)),
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-bars loading-lg text-[#5fbf54]"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-10">
                Error loading dashboard data.
            </div>
        );
    }

    // Chart Data (Static for Demo, you can make it dynamic if API supports)
    const requestStats = [
        { name: "Mon", request: 40 },
        { name: "Tue", request: 30 },
        { name: "Wed", request: 55 },
        { name: "Thu", request: 27 },
        { name: "Fri", request: 48 },
        { name: "Sat", request: 38 },
        { name: "Sun", request: 60 },
    ];

    const pieData = [
        { name: "Served Meals", value: data?.totalMeals || 10 },
        { name: "Active Users", value: data?.totalUsers || 5 },
        { name: "Reviews", value: data?.totalReviews || 8 },
    ];

    const COLORS = ["#5fbf54", "#3b82f6", "#f59e0b"];

    // Stats Card Data Array
    const statsItems = [
        {
            label: "Total Users",
            value: data?.totalUsers,
            icon: <FaUsers />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "Total Meals",
            value: data?.totalMeals,
            icon: <FaUtensils />,
            color: "bg-green-100 text-green-600",
        },
        {
            label: "Transactions",
            value: data?.totalTransactions,
            icon: <FaMoneyBillWave />,
            color: "bg-purple-100 text-purple-600",
        },
        {
            label: "Meal Requests",
            value: data?.totalMealRequests,
            icon: <FaClipboardList />,
            color: "bg-orange-100 text-orange-600",
        },
        {
            label: "Upcoming Meals",
            value: data?.totalUpcomingMeals,
            icon: <FaHourglassHalf />,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            label: "Total Reviews",
            value: data?.totalReviews,
            icon: <FaComments />,
            color: "bg-pink-100 text-pink-600",
        },
        {
            label: "Memberships",
            value: data?.totalMemberships,
            icon: <FaStar />,
            color: "bg-teal-100 text-teal-600",
        },
    ];

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fbf54] to-[#4fa846]">
                        {user?.displayName}
                    </span>
                    !
                </h1>
                <p className="text-gray-500 mt-1">
                    Here is what's happening with your platform today.
                </p>
            </div>

            {/* Stats Grid (Top Overview) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                        <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${item.color}`}
                        >
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                {item.value || 0}
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {item.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Line Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Weekly Request Analytics
                    </h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={requestStats}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#eee"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af" }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9ca3af" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "10px",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="request"
                                    stroke="#5fbf54"
                                    strokeWidth={4}
                                    dot={{
                                        r: 4,
                                        fill: "#5fbf54",
                                        strokeWidth: 2,
                                        stroke: "#fff",
                                    }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 w-full text-left">
                        Distribution Overview
                    </h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "10px",
                                        border: "none",
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Quick Actions
                </h3>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/"
                        className="btn bg-gray-800 text-white hover:bg-gray-700 border-none"
                    >
                        Visit Website
                    </Link>
                    <Link
                        to="/allMeal"
                        className="btn bg-[#5fbf54] text-white hover:bg-[#4da043] border-none"
                    >
                        Manage All Meals
                    </Link>
                    <Link
                        to="/upcomingMeal"
                        className="btn btn-warning text-white border-none"
                    >
                        Publish Upcoming Meals
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
