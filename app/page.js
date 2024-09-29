import HomePage from "@/components/HomePage";
import Hero from "./sections/Hero";
import ProductAndServices from "./sections/ProductAndServices";
import BestSeller from "./sections/BestSeller";
import TodaysSpecial from "./sections/TodaysSpecial";
import ContactUs from "./sections/ContactUs";

export default function Home() {
  return (
    <div className="flex flex-col py-16 md:py-5">
      <Hero />
      <ProductAndServices />
      <BestSeller />
      <TodaysSpecial />
      <ContactUs />
  </div>
  );
}
