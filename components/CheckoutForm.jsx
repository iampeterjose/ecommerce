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
        alert(`No functionality yet.`)
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
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2 md:px-10 py-10 text-sm text-customBlue2">
                <h2 className="text-lg font-semibold text-customBlue2">Contact Information</h2>
                <label className="mt-5">Email address</label>
                <input 
                    required
                    className="border p-2 text-base rounded-md"
                    type="email" />
                <span className="border my-10"></span>
                <h2 className="text-lg font-semibold text-customBlue2">Shipping Information</h2>
                <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                    <span className="flex flex-col w-full gap-1">
                        <label>Fist name</label>
                        <input 
                            className="border p-2 text-base rounded-md"
                            type="text" />
                    </span>
                    <span className="flex flex-col w-full gap-1">
                        <label>Last name</label>
                        <input 
                            required
                            className="border p-2 text-base rounded-md"
                            type="text" />
                    </span>
                </div>
                <label>Company (optional)</label>
                <input 
                    className="border p-2 text-base rounded-md"
                    type="text" />
                <label className="mt-5">Address</label>
                <input 
                    required
                    className="border p-2 text-base rounded-md"
                    type="text" />
                <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                    <span className="flex flex-col w-full gap-1">
                        <label>Country</label>
                        <select 
                            required
                            className="border p-2 text-base rounded-md"
                        >
                            <option value={country}>{country}</option>
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-1">
                        <label>Region</label>
                        <select
                            required
                            className="border p-2 text-base rounded-md"
                            onChange={handleRegionChange}
                        >
                            {allRegions.map((region) => (
                                <option key={region.code} value={region.code}>{region.name}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                    <span className="flex flex-col w-full gap-1">
                        <label>Province</label>
                        <select
                            required
                            className="border p-2 text-base rounded-md"
                            onChange={handleProvinceChange}
                        >
                            {allProvinces.map((prov) => (
                                <option key={prov.code} value={prov.code}>{prov.name}</option>
                            ))}
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-1">
                        <label>City/Municipality</label>
                        <select
                            required
                            className="border p-2 text-base rounded-md"
                            onChange={handleCityChange}
                        >
                            {allCity.map((city) => (
                                <option key={city.code} value={city.code}>{city.name}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                    <span className="flex flex-col w-full gap-1">
                        <label>Barangay</label>
                        <select
                            required
                            className="border p-2 text-base rounded-md"
                            onChange={handleBarangayChange}
                        >
                            {allBarangay.map((barangay) => (
                                <option key={barangay.code} value={barangay.code}>{barangay.name}</option>
                            ))}
                        </select>
                    </span>
                    <span className="flex flex-col w-full gap-1">
                        <label>Postal code</label>
                        <input 
                            required
                            className="border p-2 text-base rounded-md"
                            type="number"/>
                    </span>
                </div>
                <label>Phone</label>
                <input 
                    required
                    className="border p-2 text-base rounded-md"
                    type="number" />

                <motion.button 
                    type="submit"
                    className="my-4 border-2 bg-customOrange2 text-white rounded-md p-2 font-semibold text-base hover:bg-white hover:border-customOrange2 hover:text-customOrange2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Pay {totalPrice}
                </motion.button>
            </form>
        </div>
    )
}

export default CheckoutForm