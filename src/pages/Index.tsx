import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Accomodations from "@/components/home/Accomodations";
import PlansSection from "@/components/home/PlansSection";
import ToursHero from "@/components/home/ToursHero";
import ReviewsCarousel from "@/components/home/Reviews";

export default function HomePage() {
  return (
    <section
      className="flex flex-col justify-center gap-6"
      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
    >
      <Hero />
      <AboutPreview />
      <Accomodations />
      <PlansSection />
      <ToursHero />
      <ReviewsCarousel />
    </section>
  )
}