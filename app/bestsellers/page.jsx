export default function BestSellers() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4 pt-20 md:pt-0">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-6 border border-emerald-100 w-full max-w-2xl animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-14 h-14 text-emerald-400 mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76a6 6 0 11-8.48 0M12 3v9m0 0l3-3m-3 3l-3-3" />
        </svg>
        <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight text-center mb-2">Best Sellers</h1>
        <p className="text-emerald-500 text-lg text-center">No best sellers to display yet. Check back soon for our most popular products!</p>
        <a href="/products" className="mt-4 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6m-6 6l6 6" />
          </svg>
          Shop Now
        </a>
      </div>
    </div>
  );
}