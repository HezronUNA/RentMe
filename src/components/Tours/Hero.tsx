import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/Typography";

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
            src="https://images.unsplash.com/photo-1552980870-139c7b393f0c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Tours y Experiencias"
            className="h-full w-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          {/* Smooth transition overlay to white */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
          <div className="max-w-4xl text-center space-y-6">
            <H1>
              Explora lo extraordinario
            </H1>
            
            <P className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
              Más allá del alojamiento, te conectamos con las mejores experiencias que Costa Rica tiene para ofrecer. 
            </P>

            <div className="pt-6">
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
