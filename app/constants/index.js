import { MdHomeFilled } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { PiSignOutFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
export const navLinks = [
    {href: "/account", title: "Account", icon: <IoPersonCircleOutline size={22}/>},
    {href: "/", title: "Home", icon: <MdHomeFilled size={22}/>},
    {href: "/products", title: "Products", icon: <AiFillProduct size={22}/>},
    {href: "/signin", title: "SignIn", icon: <PiSignOutFill size={22}/>},
];

export const footerHeaders = [
    {title: "About Us", item: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quod tempora voluptates veritatis sunt dolor voluptas in at fugit ratione doloremque animi. Quasi, nisi vitae. Quam tempora eligendi rerum minima."]},
    {title: "Links" , item: ["Account", "Home", "Products"]},
    {title: "Services", item: ["Brand New Product", "Delivery", "Deals & Offers"]},
]

export const footerItems = [
    {title: "Danao City, Cebu - 6004, Philippines", icon: <ImLocation />},
    {title: "+63111 111 1111", icon: <FaPhone />},
    {title: "peterjose098@gmail.com", icon: <MdEmail />},
]