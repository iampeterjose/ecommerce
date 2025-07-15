import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] w-full gap-4 bg-[#F5F5F5] rounded-2xl shadow-lg animate-pulse border-2 border-[#1976D2]/20">
            <span className="flex items-center justify-center bg-white rounded-full shadow-md p-4 border-2 border-[#1976D2]/20">
                <AiOutlineLoading3Quarters size={40} className="text-[#1976D2] animate-spin" />
            </span>
            <h1 className="text-2xl font-extrabold text-[#1976D2] tracking-tight text-center">Loading...</h1>
            <p className="text-[#FF6F00] text-sm font-medium text-center">Please wait while we fetch your data</p>
        </div>
    );
}

export default Loading;