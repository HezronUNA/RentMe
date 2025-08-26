import Accomodations from "./sections/accomodations/Accomodations";
import { Hero } from "./sections/hero";
import ReviewsCarousel from "./sections/reviews/Reviews";

export default function HomePage() {
  return (
    <section className="flex flex-col justify-center gap-6">
     <Hero />
     <Accomodations />
     <ReviewsCarousel />
    </section>
  )
}
