import Hero from '@/components/tours/Hero'
import Intro from '@/components/tours/Intro'
import Categories from '@/components/tours/Categories'
import FeaturedTours from '@/components/tours/FeaturedTours'
import Transfers from '@/components/tours/Transfers'
import CTAFinal from '@/components/tours/CTAFinal'

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
