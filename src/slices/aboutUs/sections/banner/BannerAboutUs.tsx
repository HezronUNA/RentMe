// src/slices/aboutUs/sections/banner/BannerAboutUs.tsx
import { Skeleton } from "@/shared/components/Skeleton";
import { Button } from "@/shared/components/Button";
import { H1, P } from "@/shared/components/Typography";
import { useBanner } from "../../hooks/useBanner";
import { FaChevronDown } from "react-icons/fa";

export default function BannerAboutUs() {
  // El banner de "sobre nosotros" tiene ID "1" según tu estructura
  const { data, isLoading, isError, scrollToNextSection } = useBanner("1");

  if (isLoading) {
    return (
      <section className="relative text-white">
        <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] lg:h-[500px] overflow-hidden">
          {/* Skeleton background */}
          <div className="absolute inset-0">
            <Skeleton className="h-full w-full rounded-none" />
          </div>

          {/* Skeleton content overlay */}
          <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
            <div className="max-w-2xl text-center space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" /> {/* título */}
              <Skeleton className="h-6 w-2/3 mx-auto" />  {/* subtítulo */}
              <Skeleton className="h-10 w-40 mx-auto mt-6 rounded-md" /> {/* botón */}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center text-red-600">
        <p>Error al cargar el banner de la sección.</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-16 text-center">
        <p>Sin contenido para mostrar.</p>
      </section>
    );
  }

  return (
    <section className="relative text-white">
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] lg:h-[450px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={data.imagen}
            alt={data.titulo}
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
            <H1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide font-title">
              {data.titulo}
            </H1>
            
            <P className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
              {data.subtitulo}
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