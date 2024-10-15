"use client";
import { useEffect, useState } from "react";

const ContactUs = () => {
    const [products, setProducts] = useState([]); 
    
    useEffect(() => {
        const fetchAllProducts = async() => {
            const result = await fetch('https://dummyjson.com/products?limit=0');
            const data = await result.json();

            setProducts(data.products);
        };

        fetchAllProducts();
    }, []);

    // Step 1: Collect all tags from products
    const allTags = products.flatMap(product => product.tags);

    // Step 2: Create a Set to filter out duplicate tags
    const uniqueTags = [...new Set(allTags)];

    return (
        <section id="contactus" className="md:p-4 mt-20">
            <div className="flex flex-col items-center gap-4 py-6">
                <h1 className="text-2xl font-semibold text-customBlue2">Get In Touch</h1>
                <p className="text-customBlue2 text-sm text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit modi esse voluptates sint dignissimos. <br />Quam laudantium quidem maiores quae autem minus, alias numquam, <br />corrupti aliquam mollitia quia natus dolorem blanditiis!</p>

                <div className="flex flex-col md:flex-row gap-6 w-full md:px-20 my-6">
                    <div className="flex justify-center w-full">
                        <img src="/assets/contact.png" alt="Contact" className="w-[400px] h-[500px]" />
                    </div>
                    <span className="border border-customBlue2"></span>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                        <div className="flex flex-col justify-center gap-5 w-full">
                            <input 
                                className="px-4 py-2 rounded-md border border-customBlue2"
                                type="text" 
                                placeholder="Your name*"/>
                            <input 
                                className="px-4 py-2 rounded-md border border-customBlue2"
                                type="email" 
                                placeholder="Your email*"/>
                            <input 
                                className="px-4 py-2 border rounded-md border-customBlue2"
                                type="number" 
                                    placeholder="Your phone*"/>
                        </div>
                        <div className="flex  flex-col justify-center w-full gap-4">
                            <textarea 
                                className="px-4 py-2 w-full h-[165px] rounded-md border border-customBlue2 mt-14"
                                name="message" 
                                placeholder="Your message*"></textarea>
                            <button
                                className="bg-customOrange2 text-white px-5 py-2 rounded-md"
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs