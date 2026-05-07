import Hero from '@/components/Tours/Hero'
import Intro from '@/components/Tours/Intro'
import Categories from '@/components/Tours/Categories'
import FeaturedTours from '@/components/Tours/FeaturedTours'
import Transfers from '@/components/Tours/Transfers'
import CTAFinal from '@/components/Tours/CTAFinal'

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
