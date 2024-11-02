import { footerHeaders, footerItems } from "@/app/constants";

const Footer = () => {
    // Initialize the current year outside the component
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact-us" className="py-20 mt-10 px-2 md:px-32 font-sans w-full bg-lightBg">
            <div className="flex flex-wrap">    
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 mb-6">
                    {footerHeaders.map((header, i) => (
                        <div key={i} className="w-full">
                            <h2 className="text-lg text-customBlue2 font-semibold mb-3">
                                {header.title}
                            </h2>
                            {header.item.map((link, j) => (
                                <p key={j} className="text-sm font-semibold my-2 text-customBlue2">
                                    {link}
                                </p>
                            ))}
                        </div>
                    ))}
                    <div className="w-full">
                        <h2 className="text-lg text-customBlue2 font-semibold mb-3">Updates</h2>
                        <div className="flex relative w-full">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="block p-2 pr-[84px] w-full text-base text-customBlue2 border-customBlue2 bg-white rounded-md border-2"
                            />
                            <button className="absolute top-0 right-0 p-2 text-sm font-medium text-customBlue2 h-full border-l-2 rounded-e-sm">
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between border-t border-customBlue2 text-customBlue2 w-full text-xs my-2 py-4 gap-y-4">
                    <span>Copyright &copy; {currentYear} Peter Ellias Jose</span>
                    {footerItems.map((item, i) => (
                        <span key={i} className="flex gap-1 items-center">{item.icon}{item.title}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
