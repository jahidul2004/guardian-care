import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const data = {
        registerUser,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
