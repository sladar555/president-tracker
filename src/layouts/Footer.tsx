import Logo from "../assets/logo/logo.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs/index.js";
import { BiPlus } from "react-icons/bi/index.js";

const Footer = () => {
    return (
        <footer className="w-full bg-[#141416] border-t-[1px] border-stone-100 border-[#292B2B]">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm flex justify-center leading-5 font-medium text-[#A6AEAD]" style={{ fontFamily: "Inter" }} >
                        Copyright © {new Date().getFullYear()}
                    </span>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:space-x-10 justify-center items-center">
                        <span className="text-sm flex justify-center leading-5 font-medium text-[#A6AEAD]" style={{ fontFamily: "Inter" }} >We use cookies for better service.</span>
                        <button className="mt-4 sm:mt-0 p-[2px] font-extrabold leading-6 text-xs text-[#DADADF] border-2 border-solid border-[#DADADF] hover:border-solid hover:border-2 hover:border-[#00B0F1]" style={{ fontFamily: "Inter" }} aria-label="ACCEPT">ACCEPT</button>
                    </div>
                </div>
            </div>    
        </footer>
    )
}

export default Footer;