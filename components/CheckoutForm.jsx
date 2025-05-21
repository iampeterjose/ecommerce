"use client";
import useProductStore from "@/app/store/productStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CheckoutForm = () => {
    const { cart } = useProductStore();
    const [country, setCountry] = useState("Philippines");
    const [allRegions, setAllRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [regionName, setRegionName] = useState("");
    const [allProvinces, setAllProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [provinceName, setProvinceName] = useState("");
    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [cityName, setCityName] = useState("");
    const [allBarangay, setAllBarangay] = useState([]);
    const [selectedBarangay, setSelectedBarangay] = useState("");
    const [barangayName, setBarangayName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetch('https://psgc.gitlab.io/api/regions/');
                const data = await results.json();
                setAllRegions(data);

                if (selectedRegion) {
                    const provincesData = await fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`);
                    const provinces = await provincesData.json();
                    setAllProvinces(provinces);
                }

                if (selectedProvince) {
                    const cityData = await fetch(`https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`);
                    const city = await cityData.json();
                    setAllCity(city);
                }

                if (selectedCity) {
                    const barangayData = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`);
                    const barangay = await barangayData.json();
                    setAllBarangay(barangay);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [selectedRegion, selectedProvince, selectedCity]);

    const handleRegionChange = (e) => {
        const value = e.target.value;
        const selectedRegionData = allRegions.find(region => region.code === value);
        setSelectedRegion(value);
        setRegionName(selectedRegionData?.name || "");
    };

    const handleProvinceChange = (e) => {
        const value = e.target.value;
        const selectedProvinceData = allProvinces.find(prov => prov.code === value);
        setSelectedProvince(value);
        setProvinceName(selectedProvinceData?.name || "");
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        const selectedCityData = allCity.find(city => city.code === value);
        setSelectedCity(value);
        setCityName(selectedCityData?.name || "");
    };

    const handleBarangayChange = (e) => {
        const value = e.target.value;
        const selectedBarangayData = allBarangay.find(barangay => barangay.code === value);
        setSelectedBarangay(value);
        setBarangayName(selectedBarangayData?.name || "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`No functionality yet.`);
    };

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    const subTotal = parseFloat(calculateTotalPrice(cart)).toFixed(2); // Calculate subtotal
    const percentageValue = parseFloat((subTotal) * 0.12).toFixed(2); // Calculate 12% of subtotal
    const shippingFee = parseFloat(15.00).toFixed(2);
    const totalPrice = parseFloat(subTotal) + parseFloat(percentageValue) + parseFloat(shippingFee);

    return (
        <div className="w-full flex justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-emerald-100 flex flex-col gap-6">
                <h2 className="text-2xl font-extrabold text-emerald-700 mb-2 tracking-tight flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 15v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Contact & Shipping Information
                </h2>
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-semibold">Email address</label>
                    <input 
                        required
                        className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200"
                        type="email" />
                </div>
                <div className="border-t border-dashed border-emerald-100 my-4"></div>
                <h2 className="text-xl font-bold text-emerald-700">Shipping Information</h2>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">First name</label>
                        <input className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="text" />
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Last name</label>
                        <input required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="text" />
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Company (optional)</label>
                    <input className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Address</label>
                    <input required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="text" />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Country</label>
                        <select required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200">
                            <option value={country}>{country}</option>
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Region</label>
                        <select required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" onChange={handleRegionChange}>
                            {allRegions.map((region) => (
                                <option key={region.code} value={region.code}>{region.name}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Province</label>
                        <select required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" onChange={handleProvinceChange}>
                            {allProvinces.map((prov) => (
                                <option key={prov.code} value={prov.code}>{prov.name}</option>
                            ))}
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">City/Municipality</label>
                        <select required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" onChange={handleCityChange}>
                            {allCity.map((city) => (
                                <option key={city.code} value={city.code}>{city.name}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Barangay</label>
                        <select required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" onChange={handleBarangayChange}>
                            {allBarangay.map((barangay) => (
                                <option key={barangay.code} value={barangay.code}>{barangay.name}</option>
                            ))}
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label className="text-sm font-semibold">Postal code</label>
                        <input required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="number" />
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Phone</label>
                    <input required className="border border-emerald-200 focus:border-emerald-400 p-3 text-base rounded-xl bg-emerald-50/40 outline-none transition-all duration-200" type="number" />
                </div>
                <motion.button 
                    type="submit"
                    className="w-full mt-4 py-3 font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-lg"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Pay {totalPrice}
                </motion.button>
            </form>
        </div>
    );
};

export default CheckoutForm;