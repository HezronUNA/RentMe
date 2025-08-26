import Accomodations from "./sections/accomodations/Accomodations";
import { Hero } from "./sections/hero";
import ReviewsSection from "./sections/reviews/Reviews";

export default function HomePage() {
  return (
    <section>
     <Hero />
     <Accomodations />
     <ReviewsSection/>
    </section>
  )
}
