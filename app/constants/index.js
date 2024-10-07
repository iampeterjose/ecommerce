import { MdHomeFilled } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { PiSignOutFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
export const navLinks = [
    {href: "/account", title: "Account", icon: <IoPersonCircleOutline size={22}/>},
    {href: "/", title: "Home", icon: <MdHomeFilled size={22}/>},
    {href: "/products", title: "Products", icon: <AiFillProduct size={22}/>},
    {href: "/cart", title: "Cart", icon: <ImCart size={22}/>},
    {href: "/history", title: "Order History", icon: <FaHistory size={22}/>},
    {href: "/signin", title: "Sign In", icon: <PiSignOutFill size={22}/>},
];

export const productAndServices = [
    {title: "Seamless Shopping Experience", desc: "Enjoy a great mix of quality, convenience, and fast delivery! Shop easily for amazing products that will be quickly delivered to your door!"},
    {title: "Unmatched Variety", desc: "Explore our wide range of high-quality products just for you! From everyday essentials to unique items, we have everything to meet your needs and preferences."},
    {title: "Shop with Confidence", desc: "Experience Exceptional Products Supported by Our Dedicated and Reliable Customer Service!"},
];

export const footerHeaders = [
    {title: "About Us", item: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quod tempora voluptates veritatis sunt dolor voluptas in at fugit ratione doloremque animi. Quasi, nisi vitae. Quam tempora eligendi rerum minima."]},
    {title: "Links" , item: ["Account", "Home", "Products", "Cart", "Order History"]},
    {title: "Services", item: ["Brand New Product", "Delivery", "Deals & Offers"]},
];

export const footerItems = [
    {title: "Danao City, Cebu - 6004, Philippines", icon: <ImLocation />},
    {title: "+63 998 305 4632", icon: <FaPhone />},
    {title: "peterjose098@gmail.com", icon: <MdEmail />},
];

export const carouselPics = [
    {title: "h1", image: "/assets/h1.png"},
    {title: "h2", image: "/assets/h2.png"},
    {title: "h3", image: "/assets/h3.png"},
    {title: "h4", image: "/assets/h4.png"},
];