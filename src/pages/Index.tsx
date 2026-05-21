import Accomodations from "@/components/home/Accomodations";
import AboutPreview from "@/components/home/AboutPreview";
import Hero from "@/components/home/Hero";
import PlansSection from "@/components/home/PlansSection";
import ReviewsCarousel from "@/components/home/Reviews";
import ToursHero from "@/components/home/ToursHero";

export default function HomePage() {
  return (
    <section className="flex flex-col justify-center gap-6">
      <Hero />
      <div className="content-visibility-auto"><AboutPreview /></div>
      <div className="content-visibility-auto"><Accomodations /></div>
      <div className="content-visibility-auto"><PlansSection /></div>
      <div className="content-visibility-auto"><ToursHero /></div>
      <div className="content-visibility-auto"><ReviewsCarousel /></div>
    </section>
  )
}