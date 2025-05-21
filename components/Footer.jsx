import { footerHeaders, footerItems } from "@/app/constants";

const Footer = () => {
    // Initialize the current year outside the component
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact-us" className="py-16 mt-10 px-4 md:px-32 font-sans w-full bg-emerald-50 border-t border-emerald-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
                {/* Left: About & Links */}
                <div className="flex flex-col md:flex-row gap-10 flex-1">
                    {footerHeaders.map((header, i) => (
                        <div key={i} className="min-w-[180px] mb-6 md:mb-0">
                            <h2 className="text-lg text-emerald-700 font-bold mb-3 tracking-wide uppercase">{header.title}</h2>
                            {header.item.map((link, j) => (
                                <p key={j} className="text-sm font-medium my-2 text-emerald-600/90 leading-relaxed">{link}</p>
                            ))}
                        </div>
                    ))}
                </div>
                {/* Right: Newsletter */}
                <div className="w-full md:w-1/3 max-w-md">
                    <h2 className="text-lg text-emerald-700 font-bold mb-3 tracking-wide uppercase">Get Updates</h2>
                    <form className="flex flex-col gap-3">
                        <div className="flex relative w-full">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="block p-3 pr-[100px] w-full text-base text-emerald-700 border-emerald-300 bg-white rounded-l-md border-2 focus:outline-emerald-500"
                            />
                            <button type="submit" className="absolute top-0 right-0 h-full px-5 bg-emerald-600 text-white font-semibold rounded-r-md hover:bg-emerald-700 transition-colors">Subscribe</button>
                        </div>
                        <span className="text-xs text-emerald-500">No spam. Unsubscribe anytime.</span>
                    </form>
                </div>
            </div>
            {/* Bottom: Copyright & Contact */}
            <div className="mt-10 pt-6 border-t border-emerald-200 flex flex-col md:flex-row md:justify-between items-center gap-4 text-emerald-700 text-xs">
                <span>© {currentYear} Peter Ellias Jose. All rights reserved.</span>
                <div className="flex flex-wrap gap-4 items-center">
                    {footerItems.map((item, i) => (
                        <span key={i} className="flex gap-2 items-center text-emerald-600">{item.icon}{item.title}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
