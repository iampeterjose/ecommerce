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
        <form>
            <h3 className="text-xl pt-10 pb-5">Shipping</h3>
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
        </form>
    );
};

export default AddressForm;
