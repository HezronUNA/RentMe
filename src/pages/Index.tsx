import { Suspense, lazy } from "react";
import Hero from "@/components/home/Hero";

const AboutPreview = lazy(() => import("@/components/home/AboutPreview"));
const Accomodations = lazy(() => import("@/components/home/Accomodations"));
const PlansSection = lazy(() => import("@/components/home/PlansSection"));
const ToursHero = lazy(() => import("@/components/home/ToursHero"));
const ReviewsCarousel = lazy(() => import("@/components/home/Reviews"));

export default function HomePage() {
  return (
    <section
      className="flex flex-col justify-center gap-6"
      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
    >
      <Hero />

      <Suspense fallback={<div className="min-h-[240px]" aria-hidden="true" />}>
        <AboutPreview />
      </Suspense>

      <Suspense fallback={<div className="min-h-[260px]" aria-hidden="true" />}>
        <Accomodations />
      </Suspense>

      <Suspense fallback={<div className="min-h-[300px]" aria-hidden="true" />}>
        <PlansSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[260px]" aria-hidden="true" />}>
        <ToursHero />
      </Suspense>

      <Suspense fallback={<div className="min-h-[240px]" aria-hidden="true" />}>
        <ReviewsCarousel />
      </Suspense>
    </section>
  )
}