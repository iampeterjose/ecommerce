const ContactUs = () => {

    return (
        <section id="contactus" className="md:p-4 mt-20">
            <div className="relative flex flex-col items-center gap-6 py-14 px-2 md:px-0 bg-[#F5F5F5] rounded-3xl shadow-2xl border border-[#E3E3E3] mx-2 md:mx-20 overflow-hidden">
                {/* Modern accent circles */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1976D2]/10 rounded-full blur-3xl z-0"></div>
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FF6F00]/10 rounded-full blur-3xl z-0"></div>
                <h1 className="relative z-10 text-4xl font-extrabold text-[#1976D2] mb-2 tracking-tight drop-shadow-lg text-center">Get In Touch</h1>
                <p className="relative z-10 text-[#424242] text-base md:text-lg text-center max-w-2xl mb-4 font-medium">We'd love to hear from you! Whether you have a question about products, orders, or anything else, our team is ready to answer all your questions.</p>
                <div className="relative z-10 flex flex-col md:flex-row gap-12 w-full md:px-20 my-6 items-center">
                    <div className="flex justify-center w-full md:w-1/2">
                        <img src="/assets/contact.png" alt="Contact" className="w-[220px] md:w-[340px] h-[220px] md:h-[340px] object-contain rounded-2xl shadow-xl border-2 border-[#1976D2]/20 bg-white" />
                    </div>
                    <div className="hidden md:block h-[340px] w-px bg-[#1976D2]/20 mx-4"></div>
                    <form className="flex flex-col gap-6 w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg border border-[#E3E3E3]">
                        <div className="flex flex-col gap-4">
                            <input 
                                className="px-5 py-3 rounded-full border border-[#1976D2]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-[#1976D2] bg-[#F5F5F5] placeholder-[#1976D2]/60 font-medium shadow"
                                type="text" 
                                placeholder="Your name*"
                                required
                            />
                            <input 
                                className="px-5 py-3 rounded-full border border-[#1976D2]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-[#1976D2] bg-[#F5F5F5] placeholder-[#1976D2]/60 font-medium shadow"
                                type="email" 
                                placeholder="Your email*"
                                required
                            />
                            <input 
                                className="px-5 py-3 rounded-full border border-[#1976D2]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-[#1976D2] bg-[#F5F5F5] placeholder-[#1976D2]/60 font-medium shadow"
                                type="tel" 
                                placeholder="Your phone*"
                            />
                        </div>
                        <textarea 
                            className="px-5 py-3 w-full h-32 rounded-2xl border border-[#1976D2]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2] text-[#1976D2] bg-[#F5F5F5] placeholder-[#1976D2]/60 font-medium shadow resize-none"
                            name="message" 
                            placeholder="Your message*"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[#FF6F00] text-white px-8 py-3 rounded-full font-bold text-base shadow-lg hover:bg-[#1976D2] focus:ring-2 focus:ring-[#1976D2] transition-all"
                        >Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs