// src/slices/aboutUs/sections/banner/BannerAboutUs.tsx

import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/Typography";
import { FaChevronDown } from "react-icons/fa";

export default function BannerAboutUs() {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#about-us-content");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative text-white">
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] lg:h-[450px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/MxRS9CNB/vacation-home-4.jpg"
            alt="Sobre Nosotros"
            className="h-full w-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
          <div className="max-w-4xl text-center space-y-6">
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
                <FaChevronDown className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

