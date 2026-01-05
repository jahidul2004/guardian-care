import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa"; // Updated Icons for consistency

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                className="w-10 h-10 object-contain"
                                src={logo}
                                alt="Guardian Care Logo"
                            />
                            <span className="text-2xl font-bold text-gray-800">
                                Guardian{" "}
                                <span className="text-[#5fbf54]">Care</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Caring Like a Guardian, Always. We are dedicated to
                            providing the best meal plans and care services for
                            your loved ones.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            {[
                                FaFacebookF,
                                FaInstagram,
                                FaTwitter,
                                FaLinkedinIn,
                            ].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#5fbf54] hover:bg-[#5fbf54] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h6 className="text-gray-800 font-bold uppercase tracking-wider mb-6">
                            Services
                        </h6>
                        <ul className="space-y-3">
                            {[
                                "Meal Plans",
                                "Caregiving",
                                "Health Checkups",
                                "Emergency Support",
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="#"
                                        className="text-gray-500 hover:text-[#5fbf54] transition-colors duration-200 text-sm font-medium flex items-center group"
                                    >
                                        <span className="w-0 overflow-hidden group-hover:w-2 h-0.5 bg-[#5fbf54] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h6 className="text-gray-800 font-bold uppercase tracking-wider mb-6">
                            Company
                        </h6>
                        <ul className="space-y-3">
                            {[
                                "About Us",
                                "Contact",
                                "Careers",
                                "Success Stories",
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="#"
                                        className="text-gray-500 hover:text-[#5fbf54] transition-colors duration-200 text-sm font-medium flex items-center group"
                                    >
                                        <span className="w-0 overflow-hidden group-hover:w-2 h-0.5 bg-[#5fbf54] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h6 className="text-gray-800 font-bold uppercase tracking-wider mb-6">
                            Legal
                        </h6>
                        <ul className="space-y-3">
                            {[
                                "Terms of Use",
                                "Privacy Policy",
                                "Cookie Policy",
                                "Disclaimer",
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="#"
                                        className="text-gray-500 hover:text-[#5fbf54] transition-colors duration-200 text-sm font-medium flex items-center group"
                                    >
                                        <span className="w-0 overflow-hidden group-hover:w-2 h-0.5 bg-[#5fbf54] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Guardian Care. All
                        rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link
                            to="#"
                            className="hover:text-[#5fbf54] transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-[#5fbf54] transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-[#5fbf54] transition-colors"
                        >
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
