const page = () => {
    return (
        <div className="flex flex-col items-center py-20 md:py-10 min-h-screen bg-[#F5F5F5] px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-6 border-2 border-[#1976D2]/20 w-full max-w-2xl animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-14 h-14 text-[#1976D2] mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1976D2] tracking-tight text-center">My Order History</h1>
                <p className="text-[#424242] text-lg text-center">You haven't placed any orders yet.</p>
                <a href="/products" className="mt-4 flex items-center gap-2 bg-[#FF6F00] hover:bg-[#1976D2] text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-200 border border-[#FF6F00]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6m-6 6l6 6" />
                    </svg>
                    Shop Now
                </a>
            </div>
        </div>
    )
}

export default page