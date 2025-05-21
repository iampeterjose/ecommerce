import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] w-full gap-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl shadow-lg animate-pulse">
            <span className="flex items-center justify-center bg-white rounded-full shadow-md p-4">
                <AiOutlineLoading3Quarters size={40} className="text-emerald-500 animate-spin" />
            </span>
            <h1 className="text-2xl font-extrabold text-emerald-700 tracking-tight">Loading...</h1>
            <p className="text-emerald-400 text-sm font-medium">Please wait while we fetch your data</p>
        </div>
    );
}

export default Loading;