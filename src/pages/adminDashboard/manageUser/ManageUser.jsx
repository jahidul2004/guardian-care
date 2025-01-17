import { useEffect, useState } from "react";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    return (
        <div>
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                Manage Users
            </h1>
            <div className="overflow-x-auto border">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Badge</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.badge}</td>
                                <th>
                                    <button className="btn btn-sm bg-[#5fbf54] text-white border-none">
                                        Make Admin
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
