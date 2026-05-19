import Categories from "@/components/tours/Categories";
import CTAFinal from "@/components/tours/CTAFinal";
import FeaturedTours from "@/components/tours/FeaturedTours";
import Hero from "@/components/tours/Hero";
import Intro from "@/components/tours/Intro";
import Transfers from "@/components/tours/Transfers";



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
