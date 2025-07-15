import useProductStore from "@/app/store/productStore";
import { AddressElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const AddressForm = () => {
    const { setAddress, address } = useProductStore();

    const handleAddressChange = (event) => {
        const { complete, address } = event;
    
        if (complete) {
            console.log("Complete address:", event.value);
            setAddress(event.value);
        }
    };

    return (
        <form className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-[#1976D2]/20 flex flex-col gap-4">
            <h3 className="text-2xl font-extrabold text-[#1976D2] mb-2 tracking-tight flex items-center gap-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#FF6F00]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v1.5M3 7.5v10.25A2.25 2.25 0 005.25 20h13.5A2.25 2.25 0 0021 17.75V7.5M3 7.5h18" />
                </svg>
                Shipping Address
            </h3>
            <div className="bg-[#F5F5F5] rounded-xl p-4 border border-[#1976D2]/20">
                <AddressElement
                    options={{
                        mode: "shipping",
                        defaultValues: {
                            name: '',
                            address: {
                                line1: '',
                                line2: '',
                                city: '',
                                state: 'CA',
                                postal_code: '94080',
                                country: 'US',
                            },
                        },
                    }}
                    onChange={handleAddressChange}
                />
            </div>
        </form>
    );
};

export default AddressForm;
