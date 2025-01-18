
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const LoginRegisterPrivate = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return children;
    }

    return <Navigate to="/" replace={true}></Navigate>;
};

export default LoginRegisterPrivate;
