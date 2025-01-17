import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/user/${user.email}`)
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
        return <div>Loading...</div>;
    }

    if (isAdmin) {
        return children;
    }

    return <Navigate to="/" replace={true}></Navigate>;
};

export default AdminRoute;
