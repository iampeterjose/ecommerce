const ContactUs = () => {

    return (
        <section id="contactus" className="md:p-4 mt-20">
            <div className="flex flex-col items-center gap-4 py-10 bg-emerald-50 rounded-xl shadow-md mx-2 md:mx-0">
                <h1 className="text-3xl font-bold text-emerald-700 mb-2">Get In Touch</h1>
                <p className="text-emerald-600 text-base text-center max-w-2xl mb-4">We'd love to hear from you! Whether you have a question about products, orders, or anything else, our team is ready to answer all your questions.</p>
                <div className="flex flex-col md:flex-row gap-10 w-full md:px-20 my-6 items-center">
                    <div className="flex justify-center w-full md:w-1/2">
                        <img src="/assets/contact.png" alt="Contact" className="w-[320px] md:w-[400px] h-[320px] md:h-[420px] object-contain rounded-lg shadow" />
                    </div>
                    <div className="hidden md:block h-[340px] w-px bg-emerald-200 mx-4"></div>
                    <form className="flex flex-col gap-6 w-full md:w-1/2 bg-white p-6 rounded-lg shadow border border-emerald-100">
                        <div className="flex flex-col gap-4">
                            <input 
                                className="px-4 py-3 rounded-md border border-emerald-300 focus:outline-emerald-500 text-emerald-700 bg-emerald-50 placeholder-emerald-400"
                                type="text" 
                                placeholder="Your name*"
                                required
                            />
                            <input 
                                className="px-4 py-3 rounded-md border border-emerald-300 focus:outline-emerald-500 text-emerald-700 bg-emerald-50 placeholder-emerald-400"
                                type="email" 
                                placeholder="Your email*"
                                required
                            />
                            <input 
                                className="px-4 py-3 rounded-md border border-emerald-300 focus:outline-emerald-500 text-emerald-700 bg-emerald-50 placeholder-emerald-400"
                                type="tel" 
                                placeholder="Your phone*"
                            />
                        </div>
                        <textarea 
                            className="px-4 py-3 w-full h-32 rounded-md border border-emerald-300 focus:outline-emerald-500 text-emerald-700 bg-emerald-50 placeholder-emerald-400 resize-none"
                            name="message" 
                            placeholder="Your message*"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition-colors shadow"
                        >Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs