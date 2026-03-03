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
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-12">
          <H2 className="text-2xl md:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
            Nuestras Modalidades de Trabajo
          </H2>
        </div>

        {/* Grid de modalidades */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-2">
            {modalidades.map((modalidad, index) => (
              <div
                key={modalidad.id}
                className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col 
                 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300"
              >
                {/* Número de modalidad */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#52655B] text-white flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <P className="text-xl mb-5 font-semibold font-title text-gray-900">
                    {modalidad.titulo}
                  </P>
                </div>

                {/* Lista de servicios */}
                <div className="space-y-3">
                  {modalidad.servicios.map((servicio, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#52655B] mt-1.5 mr-3 flex-shrink-0" />
                      <P className="text-sm leading-relaxed font-body text-gray-700 flex-1">
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
              className="hover:bg-[#435349] hover:cursor-pointer transition-colors duration-300"
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

