import BestSellers from "@/components/BestSellers"
import Essentials from "@/components/Essentials"
import ExclusiveOffer from "@/components/ExclusiveOffer"
import NewArrivals from "@/components/NewArrivals"

const FeaturedCategories = () => {
    return (
        <section className="md:p-4 mt-20 md:mt-10">
            <div className="flex flex-col items-center gap-4 py-6">
                <h1 className="text-3xl font-bold text-customBlue">Featured Categories</h1>
            </div>
            <div>
                <BestSellers/>
                <NewArrivals/>
                <ExclusiveOffer/>
                <Essentials/>
            </div>
        </section>
    )
}

export default FeaturedCategories