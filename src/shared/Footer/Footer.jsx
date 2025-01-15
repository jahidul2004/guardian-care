import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-base-content p-10">
                <nav>
                    <h6 className=" text-xl font-bold text-[#5fbf54]">
                        Services
                    </h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className=" text-xl font-bold text-[#5fbf54]">
                        Company
                    </h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Career</a>
                </nav>
                <nav>
                    <h6 className=" text-xl font-bold text-[#5fbf54]">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <img className="w-[40px] h-[40px]" src={logo} alt="" />
                    <p>
                        <span
                            className="text-xl font-bold
                        "
                        >
                            Guardian Care
                        </span>
                        <br />
                        Caring Like a Guardian, Always
                    </p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4 text-2xl text-[#5fbf54]">
                        <Link>
                            <FaFacebookSquare />
                        </Link>
                        <Link>
                            <FaSquareInstagram />
                        </Link>
                        <Link>
                            <BsTwitterX />
                        </Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
