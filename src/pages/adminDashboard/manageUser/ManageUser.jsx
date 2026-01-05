import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield, FaUsers } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch users:", error);
                setLoading(false);
            });
    }, []);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to promote ${user.name} to Admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#5fbf54",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://gurdian-care-server.vercel.app/users/${user._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ role: "admin" }),
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            setUsers((prevUsers) =>
                                prevUsers.map((u) =>
                                    u._id === user._id
                                        ? { ...u, role: "admin" }
                                        : u
                                )
                            );
                            Swal.fire({
                                icon: "success",
                                title: "Promoted!",
                                text: `${user.name} is now an Admin.`,
                                confirmButtonColor: "#5fbf54",
                            });
                        }
                    });
            }
        });
    };

    // Filter Logic
    const filteredUsers = users.filter(
        (user) =>
            user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper for Badge Colors
    const getBadgeStyle = (badge) => {
        switch (badge?.toLowerCase()) {
            case "gold":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "platinum":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "silver":
                return "bg-gray-100 text-gray-700 border-gray-200";
            default:
                return "bg-orange-100 text-orange-800 border-orange-200"; // Bronze
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUsers className="text-[#5fbf54]" />
                        Manage Users
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Users: {users.length}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name or email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#5fbf54] focus:ring-2 focus:ring-[#5fbf54]/20 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#5fbf54]/5">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="p-4 font-bold border-b border-gray-100">
                                User Profile
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Membership Badge
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-center">
                                Role
                            </th>
                            <th className="p-4 font-bold border-b border-gray-100 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center">
                                    <span className="loading loading-bars loading-md text-[#5fbf54]"></span>
                                </td>
                            </tr>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user?._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {/* User Info */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-full ring-2 ring-gray-100 ring-offset-2 overflow-hidden">
                                                    <img
                                                        src={
                                                            user?.photoURL ||
                                                            "https://i.ibb.co/T1b144R/placeholder.png"
                                                        }
                                                        alt={user?.name}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 text-base">
                                                    {user?.name}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium">
                                                    {user?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Badge */}
                                    <td className="p-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getBadgeStyle(
                                                user?.badge
                                            )}`}
                                        >
                                            {user?.badge || "Bronze"}
                                        </span>
                                    </td>

                                    {/* Role */}
                                    <td className="p-4 text-center">
                                        {user?.role === "admin" ? (
                                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                                <MdOutlineSecurity /> Admin
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
                                                User
                                            </span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td className="p-4 text-right">
                                        {user?.role !== "admin" ? (
                                            <button
                                                onClick={() =>
                                                    handleMakeAdmin(user)
                                                }
                                                className="btn btn-sm bg-[#5fbf54] hover:bg-[#4da043] text-white border-none shadow-sm gap-2 normal-case font-medium"
                                                title="Make this user Admin"
                                            >
                                                <FaUserShield /> Promote
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="btn btn-sm btn-ghost text-gray-400 cursor-not-allowed normal-case"
                                            >
                                                Already Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-12 text-center text-gray-500"
                                >
                                    No users found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI (Static for now) */}
            <div className="flex justify-end mt-6">
                <div className="join border border-gray-200 rounded-lg shadow-sm">
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        «
                    </button>
                    <button className="join-item btn btn-sm bg-[#5fbf54] text-white border-none hover:bg-[#4da043]">
                        1
                    </button>
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        2
                    </button>
                    <button className="join-item btn btn-sm bg-white border-none hover:bg-gray-100">
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
