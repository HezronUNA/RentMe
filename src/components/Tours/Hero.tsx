import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/Typography";

export default function Hero() {
  const navigateToTours = () => {
    window.open("https://p.localbird.io/rentmecr-san-jose/discover", "_blank");
  };

  return (
    <section className="relative text-white">
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] lg:h-[450px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779211219/photo-1592409482913-c3094afdb249_jyijfy.avif"
            alt="Tours y Experiencias"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/20" />
          {/* Smooth transition overlay to white */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 pt-12 md:px-10 md:pt-16 lg:pt-16">
          <div className="max-w-4xl text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-white/60 rounded" />
              <span className="text-sm text-white/80 uppercase tracking-wide">Tours - Experiencias</span>
              <div className="h-[1px] w-8 bg-white/60 rounded" />
            </div>
            <H1>
              Explora lo extraordinario
            </H1>
            
            

            <div className="pt-6 md:pt-4 lg:pt-4">
              <Button
                variant="whiteBorder"
                size="lg"
                className="group relative bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:bg-white/40 hover:shadow-2xl hover:scale-105 active:scale-95 mx-auto"
                onClick={navigateToTours}
                aria-label="Explorar tours disponibles"
              >
                <span className="relative z-10 font-semibold">Reservar Tours</span>

                {/* Glow effect background */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
