import { footerHeaders, footerItems } from "@/app/constants";
import useProductStore from "@/app/store/productStore";

const Footer = () => {
    const { isOpen } = useProductStore();
    return (
        <footer id="contact-us" className={`${isOpen ? "md:px-0" : "md:px-28"} py-10 my-20 font-sans w-full border-t border-customBlue2`}>
            <div className="flex flex-wrap">
                <div className={`flex flex-col ${isOpen ? "flex-col lg:flex-row" : "md:flex-row"} justify-between gap-4 md:gap-6 mb-6`}>
                    {footerHeaders.map((header, i) => (
                        <div key={i} className="w-full">
                            <h2 className="text-lg text-customBlue2 font-semibold mb-3">
                                {header.title}
                            </h2>
                            {header.item.map((link) => (
                                <p className="text-sm font-semibold my-2 text-customBlue2">
                                    {link}
                                </p>
                            ))}
                        </div>
                    ))}
                    <div className="w-full">
                        <h2 className="text-lg text-customBlue2 font-semibold mb-3">
                            Updates
                        </h2>
                        <div className="flex relative w-full">
                            <input type="email" placeholder="Enter your email..." 
                                className="block p-2 pr-[84px] w-full text-base text-customBlue2 border-customBlue2 bg-white rounded-md border-2"
                            />
                            <button className="absolute top-0 end-0 p-2 text-sm font-medium text-customBlue2 h-full border-l-2 rounded-e-sm">
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col ${isOpen ? "md:flex-col lg:flex-row" : "md:flex-row"} justify-between border-t border-customBlue2 text-customBlue2s w-full text-xs my-2 py-4 gap-y-4`}>
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