import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    const [dbUser, setDbUser] = useState(null);
    console.log("Db user is:", dbUser);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/user/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setDbUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user?.email]);
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
