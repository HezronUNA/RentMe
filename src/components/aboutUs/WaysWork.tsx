// src/slices/aboutUs/sections/waysWork/WaysWork.tsx

import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/Typography";
import { Link } from "@tanstack/react-router";

export default function WaysWork() {
  // Datos estáticos de modalidades
  const modalidades = [
    {
      id: 1,
      titulo: "Alquiler de Propiedades",
      servicios: [
        "Gestión de calendario en múltiples plataformas",
        "Publicación en Airbnb, Booking, VRBO",
        "Atención a huéspedes 24/7",
        "Mantenimiento y limpieza",
      ]
    },
    {
      id: 2,
      titulo: "Venta de Inmuebles",
      servicios: [
        "Asesoría personalizada",
        "Marketing digital y fotografía profesional",
        "Visitas guiadas",
        "Gestión legal y trámites",
      ]
    },
    {
      id: 3,
      titulo: "Servicios Adicionales",
      servicios: [
        "Tours y experiencias locales",
        "Transporte privado",
        "Servicios de concierge",
        "Recomendaciones personalizadas",
      ]
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute left-[-8rem] top-24 h-[28rem] w-[28rem] rounded-full bg-[#e7eee9]/55 blur-[95px]" />
        <div className="absolute right-[-10rem] bottom-[-7rem] h-[30rem] w-[30rem] rounded-full bg-[#f1e8dc]/60 blur-[105px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-12">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold">
            Gestion Integral Inmobiliaria
          </p>
          <H2 className="mx-auto mt-3 max-w-3xl text-center">
            Nuestras Modalidades de Trabajo
          </H2>
          <P className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-700 sm:text-base">
            Diseñamos servicios claros y medibles para maximizar resultados y reducir fricción en cada etapa.
          </P>
        </div>

        {/* Grid de modalidades */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-2">
            {modalidades.map((modalidad, index) => (
              <div
                key={modalidad.id}
                className="group h-full rounded-3xl border border-[#52655B]/15 bg-white/90 p-6 shadow-[0_12px_30px_rgba(82,101,91,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(82,101,91,0.18)]"
              >
                {/* Número de modalidad */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#52655B] text-white flex items-center justify-center font-semibold text-base shadow-md">
                    {index + 1}
                  </div>
                  <P className="!mt-0 text-lg sm:text-xl font-semibold text-[#2f3a35] leading-tight">
                    {modalidad.titulo}
                  </P>
                </div>

                {/* Lista de servicios */}
                <div className="space-y-3.5">
                  {modalidad.servicios.map((servicio, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-transparent px-1.5 py-1 transition-colors duration-300 group-hover:border-[#52655B]/10">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-[#52655B] flex-shrink-0" />
                      <P className="!mt-0 flex-1 text-sm leading-relaxed text-zinc-700">
                        {servicio}
                      </P>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Ver más */}
        <div className="text-center">
          <Link to="/servicios">
            <Button
              variant="green"
              size="lg"
              className="rounded-full border border-transparent px-8 hover:bg-[#435349] hover:cursor-pointer transition-colors duration-300"
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

