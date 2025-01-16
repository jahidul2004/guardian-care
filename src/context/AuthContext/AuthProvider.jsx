import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const name = "John Doe";
    const data = {
        name,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
