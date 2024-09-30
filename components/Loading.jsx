import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex absolute flex-col gap-2 px-10 py-4 top-0 w-full h-full bg-slate-50 opacity-70 justify-center items-center">
            <p className="text-lg font-semibold">Loading</p>
            <AiOutlineLoading3Quarters size={25} className="animate-spin" />
        </div>
    )
}

export default Loading