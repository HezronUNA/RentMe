import Accomodations from "./sections/accomodations/Accomodations";
import { Hero } from "./sections/hero";
import ReviewsCarousel from "./sections/reviews/Reviews";
import PlansSection from "./sections/services/components/PlansSection";


export default function HomePage() {
  return (
    <section className="flex flex-col justify-center gap-6">
     <Hero />
    <PlansSection />
     <Accomodations />
     <ReviewsCarousel />
    
    </section>
  )
}
