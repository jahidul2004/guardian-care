import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    const [dbUser, setDbUser] = useState(null);

    const email = user?.email;
    console.log(email);
    useEffect(() => {
        fetch(`http://localhost:3000/user/${email}`)
        .then(res => res.json())
        .then(data => {
            setDbUser(data);
        })
    },[email])
    return (
        <div className="w-full p-5 md:p-8">
            <h1 className="text-center font-bold text-3xl py-4 mb-10">
                My Profile
            </h1>

            <div className="bg-[#5fbf54] w-full p-5 md:p-10 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        className="w-[80px] h-[80px] rounded-full"
                        src={user?.photoURL}
                        alt=""
                    />
                    <div>
                        <h1 className="text-2xl font-bold">
                            {user?.displayName}
                        </h1>
                        <p className="font-semibold">{user?.email}</p>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold ">{dbUser?.badge}</h1>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
