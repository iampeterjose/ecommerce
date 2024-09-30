import { ImLocation } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { footerHeaders, footerItems } from "@/app/constants";

const Footer = () => {
    return (
        <footer id="contact-us" className="px-3 md:px-28 py-10 font-sans text-white bg-customBlue w-full z-10 absolute">
            <div className="flex flex-wrap">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 mb-6">
                    {footerHeaders.map((header, i) => (
                        <div key={i} className="w-full">
                            <h2 className="text-lg font-semibold mb-3">
                                {header.title}
                            </h2>
                            {header.item.map((link) => (
                                <p className="text-sm font-semibold my-2 text-slate-400">
                                    {link}
                                </p>
                            ))}
                        </div>
                    ))}
                    <div className="w-full">
                        <h2 className="text-lg font-semibold mb-3">
                            Updates
                        </h2>
                        <div className="flex relative w-full">
                            <input type="email" placeholder="Enter your email..." 
                                className="block px-2 py-1 pr-[84px] w-full text-base text-slate-700 bg-gray-50 rounded-md border"
                            />
                            <button className="absolute top-0 end-0 px-2 py-1 text-sm font-medium text-slate-700 h-full border-l-2 rounded-e-sm">
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between border-t border-slate-100 w-full text-xs my-2 py-4 gap-y-4">
                    <span>Copyright &copy; {new Date().getFullYear()} Peter Ellias Jose</span>
                    {footerItems.map((item, i) => (
                        <span key={i} className="flex gap-1 items-center">{item.icon}{item.title}</span>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer