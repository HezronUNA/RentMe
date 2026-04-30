import { H2 } from "@/components/ui/Typography";
import { OrbitAnimation } from "./orbitAnimation/OrbitAnimation";
import { platformsConfig } from "./orbitAnimation/orbitConfig";
import { PromotionsMobile } from "./PromotionsMobile";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Promotions() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate({ to: "/reservar-servicio" });
  };

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden md:block py-10 bg-white">
        <div className="container mx-auto px-4">
          <H2 className="mt-8 text-center mb-4">
           Donde Promocionamos tu propiedad
          </H2>

          <div className="max-w-4xl mx-auto">
            <OrbitAnimation
              items={platformsConfig}
              centerContent={
                <img 
                  src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png" 
                  alt="Costa Rica DMR Rentals" 
                  className="mx-auto max-w-[200px] md:max-w-[250px] h-auto rounded-lg"
                />
              }
              className="mb-4"
              containerSize={500}
            />
            
            <div className="text-center max-w-2xl mx-auto mt-1">
              <p className="text-gray-600 leading-relaxed mb-6">
              En DMR Rentals impulsamos la visibilidad de tu propiedad a través de canales estratégicos como Airbnb, Booking y nuestras redes sociales (Instagram, Facebook y TikTok).  Nos encargamos de gestionar cada perfil con contenido atractivo, atención constante y enfoque profesional, logrando así atraer más reservas, mejorar la reputación en línea y fidelizar a tus huéspedes.
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-[#52655B] hover:bg-[#3d4a42] text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <PromotionsMobile />
      </div>
    </>
  );
}

