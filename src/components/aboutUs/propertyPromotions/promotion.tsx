import { H2 } from "@/components/ui/Typography";
import { OrbitAnimation } from "./orbitAnimation/OrbitAnimation";
import { platformsConfig } from "./orbitAnimation/orbitConfig";
import { PromotionsMobile } from "./PromotionsMobile";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, Star } from "lucide-react";

export function Promotions() {
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
    <>
      {/* Desktop Version */}
      <section className="hidden md:block py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <H2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
              Donde Promocionamos tu propiedad
            </H2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Impulsa la visibilidad de tu propiedad con nuestra estrategia
              integral de marketing digital
            </p>
          </div>

          {/* Orbit Animation */}
          <div className="max-w-4xl mx-auto mb-12">
            <OrbitAnimation
              items={platformsConfig}
              centerContent={
                <img
                  src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png"
                  alt="Costa Rica DMR Rentals"
                  className="mx-auto max-w-[200px] md:max-w-[250px] h-auto rounded-lg shadow-lg"
                />
              }
              containerSize={500}
            />
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#faf8f3] to-white rounded-2xl p-8 border border-[#e8e4d8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4 inline-block p-3 bg-[#52655B]/10 rounded-xl">
                    <IconComponent className="w-6 h-6 text-[#52655B]" />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto text-center rounded-2xl p-10 md:p-14">
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6">
              ¿Listo para impulsar tu propiedad?
            </h3>
            <p className="text-zinc-600 text-lg mb-8 max-w-xl mx-auto">
              Contacta con nosotros hoy y descubre cómo podemos ayudarte a aumentar
              tus reservas y mejorar tu rentabilidad.
            </p>
            <Button
              onClick={handleContactClick}
              className="bg-[#52655B] hover:bg-[#3d4a42] text-white px-10 py-3 rounded-lg font-bold shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Contáctanos
            </Button>
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

