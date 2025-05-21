import { ImLocation } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
export const navLinks = [
    {href: "/", title: "Home", view: "desktop" },
    {href: "/products", title: "Products", view: "desktop" },
    {href: "/#contactus", title: "Contact Us", view: "desktop" },
    {href: "/cart", title: "Cart", view: "mobile" },
    {href: "/history", title: "Order History", view: "mobile" }
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