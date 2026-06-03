// src/slices/aboutUs/sections/banner/BannerAboutUs.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/Typography";
import { ChevronDownIcon } from "@/app/context/icons";

export default function BannerAboutUs() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#about-us-content");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative text-white">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[#4f665b] md:h-[60vh] lg:h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#6f857a_0%,#52655b_44%,#2f3a35_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%)]" />
          <img
            src="https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779381042/dji_fly_20250917_100912_790_1758125418822_photo_optimized_1_zrb4o0.avif"
            alt="Sobre Nosotros"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`relative z-10 h-full w-full object-cover transition-all duration-700 ease-out ${
              imageLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-[1.03]"
            }`}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 pt-6 md:px-10 md:pt-8 lg:pt-10">
          <div className="max-w-4xl text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-white/60 rounded" />
              <span className="text-sm text-white/80 uppercase tracking-wide">Sobre nosotros</span>
              <div className="h-[1px] w-8 bg-white/60 rounded" />
            </div>
            <H1>
              DMR Rentals
            </H1>
            
            <P className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
              No solo administramos tu propiedad, también creamos experiencias inolvidables
            </P>

            <div className="pt-4">
              <Button
                variant="whiteBorder"
                size="lg"
                className="hover:bg-white hover:text-[#52655B] hover:cursor-pointer hover:border-white transition-all duration-300 p-4 rounded-full animate-bounce"
                onClick={scrollToNextSection}
                aria-label="Ir a la siguiente sección"
              >
                <ChevronDownIcon size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

