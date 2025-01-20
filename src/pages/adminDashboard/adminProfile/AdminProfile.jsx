import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../context/AuthContext/AuthContext";

const fetchUserData = async (email) => {
    const response = await fetch(`http://localhost:3000/user/${email}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    const {
        data: dbUser,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: () => fetchUserData(user?.email),
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading user data: {error.message}</p>;
    }

    return (
        <div className="flex flex-col items-center space-y-4 bg-[#f1f1f1] p-4 md:p-10 rounded-lg">
            <img
                className="h-[100px] w-[100px] rounded-full border-2 border-[#5fbf54] p-1"
                src={dbUser?.photoURL}
                alt=""
            />
            <p className="text-[#5fbf54]">{dbUser?.role}</p>
            <h1 className="text-xl font-bold">{dbUser?.name}</h1>
            <p className="font-semibold">{dbUser?.email}</p>
        </div>
    );
};

export default AdminProfile;
