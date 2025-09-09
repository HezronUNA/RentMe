// src/slices/aboutUs/sections/banner/BannerAboutUs.tsx
import { Skeleton } from "@/shared/components/Skeleton";
import { H1, P } from "@/shared/components/Typography";
import { useHero } from "@/shared/hooks/useHero";

export default function BannerAboutUs() {
  const { items, error, loading } = useHero("");

  if (loading) {
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

  if (error) {
    return (
      <section className="py-16 text-center text-red-600">
        <p>Error al cargar el banner de la sección.</p>
      </section>
    );
  }

  if (!items.length) {
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
            src={items[2].imagen}
            alt={items[2].titulo}
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
              {items[2].titulo}
            </H1>
            
            <P className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
              {items[2].subtitulo}
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}