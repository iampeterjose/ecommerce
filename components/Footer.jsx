const Footer = () => {
    return (
        <footer id="contact-us" className="px-3 md:px-20 py-10 font-sans text-white bg-customBlue w-full z-10 absolute">
            <div className="flex flex-wrap">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div>
                        <h2 className="text-lg font-semibold">
                            About Us
                        </h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quod tempora voluptates veritatis sunt dolor voluptas in at fugit ratione doloremque animi. Quasi, nisi vitae. Quam tempora eligendi rerum minima.</p>
                    </div>
                    <div className="flex gap-x-40">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Links
                            </h2>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Services
                            </h2>
                        </div>
                    </div>
                    <span className="text-xs">Copyright &copy; {new Date().getFullYear()} Peter Ellias Jose</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer