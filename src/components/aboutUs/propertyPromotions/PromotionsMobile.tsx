import { H2 } from "@/components/ui/Typography";
import { OrbitAnimation } from "./orbitAnimation/OrbitAnimation";
import { platformsConfigMobile } from "./orbitAnimation/orbitConfigMobile";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, Star } from "lucide-react";

export function PromotionsMobile() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate({ to: "/reservar-servicio" });
  };

  const benefits = [
    {
      icon: Camera,
      title: "Contenido Profesional",
      description:
        "Fotos de alta calidad, videos atractivos y descripciones optimizadas que destacan tu propiedad.",
    },
    {
      icon: TrendingUp,
      title: "Más Visibilidad",
      description:
        "Presencia en Airbnb, Booking, Instagram, Facebook y TikTok para alcanzar más huéspedes potenciales.",
    },
    {
      icon: Star,
      title: "Mejor Reputación",
      description:
        "Gestión profesional que mejora tus calificaciones y fideliza a tus huéspedes a largo plazo.",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Título optimizado para móvil */}
        <H2 className="text-center mb-8">
          Donde Promocionamos tu propiedad 
        </H2>

        {/* Contenido principal con animación orbital para móvil */}
        <div className="max-w-sm mx-auto mb-8">
          <OrbitAnimation
            items={platformsConfigMobile}
            centerContent={
              <img 
                src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png" 
                alt="Costa Rica DMR Rentals" 
                className="max-w-[140px] h-auto rounded-lg"
              />
            }
            containerSize={340}
          />
        </div>

        {/* Benefits Cards */}
        <div className="space-y-4 mb-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#faf8f3] to-white rounded-2xl p-6 border border-[#e8e4d8] shadow-sm"
              >
                <div className="mb-3 inline-block p-2 bg-[#52655B]/10 rounded-xl">
                  <IconComponent className="w-5 h-5 text-[#52655B]" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {benefit.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-3">
            ¿Listo para impulsar tu propiedad?
          </h3>
          <p className="text-zinc-600 text-sm mb-6">
            Contacta con nosotros hoy y descubre cómo podemos ayudarte.
          </p>
        </div>

        {/* Botón de llamada a la acción */}
        <div className="flex justify-center">
          <Button
            onClick={handleContactClick}
            className="bg-[#52655B] hover:bg-[#3d4a42] text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
}

