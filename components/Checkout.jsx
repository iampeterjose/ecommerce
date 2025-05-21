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
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-emerald-100 flex flex-col gap-6">
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-2 tracking-tight flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment
            </h3>
            {clientSecret && <PaymentElement className="mb-4" />}
            {errorMessage && <div className="text-rose-600 font-semibold text-center bg-rose-50 border border-rose-200 rounded-lg p-2 mb-2">{errorMessage}</div>}
            <button 
                disabled={!stripe || loading}
                className="w-full py-3 font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-lg disabled:opacity-50 disabled:animate-pulse mt-2"
            > 
                {!loading ? `Pay $${amount}`: "Processing..."}
            </button>
        </form>
    );
    
}

export default Checkout