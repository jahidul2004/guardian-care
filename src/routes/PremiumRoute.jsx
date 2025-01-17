import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (
        user.badge === "silver" ||
        user.badge === "gold" ||
        user.badge === "platinum"
    ) {
        return children;
    }

    return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be a premium user to access this page!",
    });
};

export default PrivateRoute;
