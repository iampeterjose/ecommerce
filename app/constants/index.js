import { MdHomeFilled } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { PiSignOutFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
export const navLinks = [
    {href: "/account", title: "Account", icon: <IoPersonCircleOutline size={20}/>},
    {href: "/", title: "Home", icon: <MdHomeFilled size={20}/>},
    {href: "/products", title: "Products", icon: <AiFillProduct size={20}/>},
    {href: "/signin", title: "SignIn", icon: <PiSignOutFill size={20}/>},
];