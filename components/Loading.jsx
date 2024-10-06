import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {

    return (
        <div className="flex flex-col text-customDark gap-2 px-10 py-4 top-0 w-full h-full justify-center items-center">
            <h1 className="text-xl font-bold">Loading</h1>
            <AiOutlineLoading3Quarters size={25} className="animate-spin" />
        </div>
    )
}

export default Loading