const ContactUs = () => {

    return (
        <section id="contactus" className="md:p-4 mt-20">
            <div className="relative flex flex-col items-center gap-6 py-14 px-2 md:px-0 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/60 mx-2 md:mx-0 overflow-hidden">
                {/* Glassy emerald accent circle */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl z-0"></div>
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl z-0"></div>
                <h1 className="relative z-10 text-4xl font-extrabold text-emerald-700 mb-2 tracking-tight drop-shadow-lg">Get In Touch</h1>
                <p className="relative z-10 text-emerald-600 text-lg text-center max-w-2xl mb-4 font-medium">We'd love to hear from you! Whether you have a question about products, orders, or anything else, our team is ready to answer all your questions.</p>
                <div className="relative z-10 flex flex-col md:flex-row gap-12 w-full md:px-20 my-6 items-center">
                    <div className="flex justify-center w-full md:w-1/2">
                        <img src="/assets/contact.png" alt="Contact" className="w-[320px] md:w-[400px] h-[320px] md:h-[420px] object-contain rounded-2xl shadow-xl border-2 border-emerald-100 bg-white/60" />
                    </div>
                    <div className="hidden md:block h-[340px] w-px bg-emerald-100/60 mx-4"></div>
                    <form className="flex flex-col gap-6 w-full md:w-1/2 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-emerald-100/80">
                        <div className="flex flex-col gap-4">
                            <input 
                                className="px-5 py-3 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 bg-emerald-50/60 placeholder-emerald-400 font-medium shadow"
                                type="text" 
                                placeholder="Your name*"
                                required
                            />
                            <input 
                                className="px-5 py-3 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 bg-emerald-50/60 placeholder-emerald-400 font-medium shadow"
                                type="email" 
                                placeholder="Your email*"
                                required
                            />
                            <input 
                                className="px-5 py-3 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 bg-emerald-50/60 placeholder-emerald-400 font-medium shadow"
                                type="tel" 
                                placeholder="Your phone*"
                            />
                        </div>
                        <textarea 
                            className="px-5 py-3 w-full h-32 rounded-2xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-700 bg-emerald-50/60 placeholder-emerald-400 font-medium shadow resize-none"
                            name="message" 
                            placeholder="Your message*"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:from-emerald-600 hover:to-emerald-500 focus:ring-2 focus:ring-emerald-400 transition-all"
                        >Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs