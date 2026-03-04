import Accomodations from "@/components/home/Accomodations";
import Hero from "@/components/home/Hero";
import PlansSection from "@/components/home/PlansSection";
import ReviewsCarousel from "@/components/home/Reviews";

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