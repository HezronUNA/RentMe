// src/slices/aboutUs/sections/banner/BannerAboutUs.tsx

import { Skeleton } from "@/components/ui/Skeleton";
import { H1, P } from "@/components/ui/Typography";

export default function ServiceDetailHero() {
  // Contenido estático del hero
  const heroData = {
    titulo: 'NUESTROS SERVICIOS',
    subtitulo: 'Ofrecemos soluciones completas para la gestión de tu propiedad',
    imagen: 'https://i.ibb.co/KxHH5GvT/Vacation-Homes.jpg'
  };

  return (
    <section className="relative text-white">
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] lg:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-none" />
        </div>

        {/* Skeleton content overlay */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
          <div className="max-w-2xl text-center space-y-4">
            <H1>{heroData.titulo}</H1>
            <P className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
              {heroData.subtitulo}
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}

