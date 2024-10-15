"use client";
import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loading from "./Loading";
import useProductStore from "@/app/store/productStore";

const Checkout = ({amount}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCart, clearCart } = useProductStore();

    useEffect(() => {
        const createPaymentIntent = async () => {
            setLoading(true); // Set loading state
            try {
                const res = await fetch("/api/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
                });
    
                if (!res.ok) {
                    const errorData = await res.json();
                    setErrorMessage(errorData.error || "Failed to create payment intent.");
                    return;
                }
    
                const data = await res.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                setErrorMessage("Network error: " + error.message);
            } finally {
                setLoading(false); // Reset loading state
            }
        };
    
        createPaymentIntent();
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!stripe || !elements){
            return;
        }

        const { error: submitError } = await elements.submit();
        if(submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        // Call clearCart and check if it's successful
        clearCart(); 
        console.log("Cart should be cleared now"); // Debug log

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `https://mystore-ecommercev2.vercel.app/payment-success?amount=${amount}`,
            },
        });

        if(error){
            setErrorMessage(error.message);
        }
        else{
            // Redirect to success page if needed (optional, since return_url handles this)
            window.location.href = `/payment-success?amount=${amount}`;
        }

        setLoading(false);
    };

    if(!clientSecret || !stripe || !elements){
        return <Loading />
    }
    

    return (
        <form onSubmit={handleSubmit} className="border my-5 p-5 rounded-md">
            {clientSecret && <PaymentElement />}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button 
                disabled={!stripe || loading}
                className="my-4 border-2 bg-customOrange2 w-full text-white rounded-md p-2 font-semibold text-base hover:bg-white hover:border-customOrange2 hover:text-customOrange2 disabled:opacity-50 disabled:animate-pulse"
            > 
            {!loading ? `Pay $${amount}`: "Processing..."}
            </button>
        </form>
    );
    
}

export default Checkout