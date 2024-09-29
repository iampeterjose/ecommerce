const Footer = () => {
    return (
        <footer id="contact-us" className="px-3 md:px-20 py-10 font-sans text-white bg-customBlue w-full z-10 absolute">
            <div className="flex flex-wrap">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div className="w-full">
                        <h2 className="text-lg font-semibold">
                            About Us
                        </h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quod tempora voluptates veritatis sunt dolor voluptas in at fugit ratione doloremque animi. Quasi, nisi vitae. Quam tempora eligendi rerum minima.</p>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold">
                            Links
                        </h2>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold">
                            Services
                        </h2>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold">
                            Subscribe
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between border-t border-slate-100 w-full text-xs my-2 py-2">
                    <span>Copyright &copy; {new Date().getFullYear()} Peter Ellias Jose</span>
                    <span>Danao City, Cebu - 6004, Philippines</span>
                    <span>+63111 111 1111</span>
                    <span>peterjose098@gmail.com</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer