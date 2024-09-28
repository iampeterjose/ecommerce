const Footer = () => {
    return (
        <footer id="contact-us" className="px-2 md:px-20 py-5 font-sans text-white bg-customBlue w-full z-10 absolute">
            <div className="flex flex-wrap">
                <div className="flex flex-col gap-4">
                    <h1 className="text-base">eCommerce</h1>
                    <span className="text-xs">Copyright &copy; {new Date().getFullYear()} Peter Ellias Jose</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer