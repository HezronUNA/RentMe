
import { useWhatWeDo } from "@/slices/aboutUs/hooks/useWhatWeDo";
import DesktopAboutUs from "./components/DesktopAboutUs";
import MobileAboutUs from "./components/MobileAboutUs";


export default function WhatWeDDo() {
  const { loading, header, cards, icons, setupCarousel } = useWhatWeDo();

  if (loading) {
    return (
  <section >
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-72 bg-neutral-200 rounded" />
          <div className="h-5 w-full bg-neutral-200 rounded" />
          <div className="h-5 w-11/12 bg-neutral-200 rounded" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-56 bg-neutral-100 rounded-2xl border border-zinc-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!header) return null;

  return (
    <section id="about-us-content" className="mx-auto max-w-6xl px-4 py-16">
      {/* Versión Desktop */}
      <div className="hidden md:block">
        <DesktopAboutUs header={header} cards={cards} icons={icons} />
      </div>

      {/* Versión Mobile */}
      <div className="md:hidden">
        <MobileAboutUs header={header} cards={cards} icons={icons} setupCarousel={setupCarousel} />
      </div>
    </section>
  );
}
