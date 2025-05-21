import Hero from "./sections/Hero";
import FeaturedCategories from "./sections/FeaturedCategories";
import ContactUs from "./sections/ContactUs";
import ProductAndServices from "./sections/ProductAndServices";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div className="flex flex-col py-12 md:py-0">
      <Hero />
      <Categories />
      <FeaturedCategories />
      <ProductAndServices />
      <ContactUs />
    </div>
  );
}
