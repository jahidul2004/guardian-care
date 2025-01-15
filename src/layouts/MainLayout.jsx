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
            <div className="container mx-auto p-4">
                <Outlet></Outlet>
            </div>
            {/* Outlet end */}

            {/* Footer */}
            <Footer></Footer>
            {/* Footer end */}
        </div>
    );
};

export default MainLayout;
