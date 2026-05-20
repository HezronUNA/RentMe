import Categories from "@/components/Tours/Categories";
import CTAFinal from "@/components/Tours/CTAFinal";
import FeaturedTours from "@/components/Tours/FeaturedTours";
import Hero from "@/components/Tours/Hero";
import Intro from "@/components/Tours/Intro";
import Transfers from "@/components/Tours/Transfers";


export default function ToursPage() {
  return (
    <div className="w-full">
      {/* Tours Components */}
      <Hero />
      <Intro />
      <Categories />
      <FeaturedTours />
      <Transfers />
      <CTAFinal />
    </div>
  )
}
