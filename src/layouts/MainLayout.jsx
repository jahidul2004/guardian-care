import { Outlet } from "react-router-dom";
import NavBar from "../shared/Navbar/NavBar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <NavBar></NavBar>
            {/* Navbar end */}

            {/* Outlet */}
            <Outlet></Outlet>
            {/* Outlet end */}

            {/* Footer */}
            <Footer></Footer>
            {/* Footer end */}
        </div>
    );
};

export default MainLayout;
