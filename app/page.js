import Hero from "./sections/Hero";
import FeaturedCategories from "./sections/FeaturedCategories";
import ContactUs from "./sections/ContactUs";

export default function Home() {
  return (
    <div className="flex flex-col py-16 md:py-5">
      <Hero />
      <FeaturedCategories />
      <ContactUs />
    </div>
  );
}
