import { H2 } from "@/components/ui/Typography";
import { OrbitAnimation } from "./orbitAnimation/OrbitAnimation";
import { platformsConfigMobile } from "./orbitAnimation/orbitConfigMobile";

export function PromotionsMobile() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        {/* Título optimizado para móvil */}
        <H2 className="text-center mb-4">
          Donde Promocionamos tu propiedad 
        </H2>

        {/* Contenido principal con animación orbital para móvil */}
        <div className="max-w-sm mx-auto">
          <OrbitAnimation
            items={platformsConfigMobile}
            centerContent={
              <img 
                src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png" 
                alt="Costa Rica DMR Rentals" 
                className="max-w-[120px] h-auto rounded-lg"
              />
            }
            className="mb-4"
            containerSize={300}
          />
          
          {/* Descripción */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed px-2">
              En DMR Rentals impulsamos la visibilidad de tu propiedad a través de canales estratégicos como Airbnb, Booking y nuestras redes sociales (Instagram, Facebook y TikTok).  Nos encargamos de gestionar cada perfil con contenido atractivo, atención constante y enfoque profesional, logrando así atraer más reservas, mejorar la reputación en línea y fidelizar a tus huéspedes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

