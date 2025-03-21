import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://gurdian-care-server.vercel.app/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Failed to fetch users:", error));
    }, []);

    const handleMakeAdmin = (id) => {
        fetch(`https://gurdian-care-server.vercel.app/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "admin" }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === id ? { ...user, role: "admin" } : user
                        )
                    );

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "User role updated to admin",
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "No Changes",
                        text: "User role was not updated.",
                    });
                }
            })
            .catch((err) => {
                console.error("Error updating user role:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update user role.",
                });
            });
    };

    const filteredUsers = users.filter(
        (user) =>
            user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Manage Users
            </h1>
            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto border">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Badge</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.photoURL}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.badge}</td>
                                <td>{user?.role}</td>
                                <th>
                                    {user?.role !== "admin" && (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user._id)
                                            }
                                            className="btn btn-sm bg-[#5fbf54] text-white border-none"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default ManageUser;
