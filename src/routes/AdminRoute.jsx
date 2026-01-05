import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://gurdian-care-server.vercel.app/user/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.role === "admin") {
                        setIsAdmin(true);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setIsAdmin(false);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [user?.email]);

    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    if (isAdmin) {
        return children;
    }

    return <Navigate to="/" replace={true}></Navigate>;
};

export default AdminRoute;
