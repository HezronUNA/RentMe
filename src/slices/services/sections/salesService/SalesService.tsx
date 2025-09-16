// src/slices/services/sections/salesService/SalesService.tsx
import { useSalesServices } from "../../hooks/useSalesServices";
import { useServiceTitle } from "../../hooks/useServiceTitle";
import { MarqueeRow } from "./components";
import { H2, P } from "@/shared/components/Typography";

export default function ServiciosMarquee() {
  const { topRowItems, bottomRowItems, loading: servicesLoading, error: servicesError, retry: retryServices } = useSalesServices();
  const { title, loading: titleLoading, error: titleError, retry: retryTitle } = useServiceTitle();

  // Si cualquiera de los dos está cargando
  const isLoading = servicesLoading || titleLoading;
  
  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid place-content-center h-[480px]">
          <div className="animate-pulse text-neutral-500">Cargando servicios…</div>
        </div>
      </section>
    );
  }

  // Si hay error en cualquiera de los dos
  const hasError = servicesError || titleError;
  
  if (hasError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center space-y-4">
          {titleError && (
            <div className="text-red-500">Error al cargar título: {titleError}</div>
          )}
          {servicesError && (
            <div className="text-red-500">Error al cargar servicios: {servicesError}</div>
          )}
          <div className="space-x-4">
            {titleError && (
              <button 
                onClick={retryTitle}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Reintentar título
              </button>
            )}
            {servicesError && (
              <button 
                onClick={retryServices}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Reintentar servicios
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {/* Header - mismo estilo que AboutUs */}
      {title && (
        <div className="text-center mb-12">
          <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
            {title.titulo}
          </H2>
          <P className="mt-4 text-base sm:text-lg text-zinc-700 leading-relaxed">
            {title.descripcion}
          </P>
        </div>
      )}

      {/* Marquee de servicios */}
      <div className="w-full max-w-4xl mx-auto h-[480px] bg-white rounded-xl overflow-hidden px-2 py-8 flex flex-col gap-10">
        <div className="flex-1 flex items-center justify-center">
          <MarqueeRow items={topRowItems} direction="right" speed={18} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <MarqueeRow items={bottomRowItems} direction="left" speed={20} />
        </div>
      </div>
    </section>
  );
}
