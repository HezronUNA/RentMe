// src/slices/aboutUs/sections/waysWork/WaysWork.tsx
import { Skeleton } from "@/shared/components/Skeleton";
import { H2, H3, P } from "@/shared/components/Typography";
import { Link } from "@tanstack/react-router";
import { useModalidades } from "../../hooks/useWaysWork";
import { Button } from "../../../../shared/components/Button"

export default function WaysWork() {
  const { data, isLoading, isError } = useModalidades();

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-3/5 mx-auto mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center text-red-600">
        <p>Error al cargar las modalidades de trabajo.</p>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section className="py-16 text-center">
        <p>No hay modalidades disponibles.</p>
      </section>
    );
  }
  
 // ...existing code...
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
            {data.map((modalidad, index) => (
              <div
                key={modalidad.id}
                className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col 
                 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)]  transition-all duration-300"
              >
                {/* Número de modalidad */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#52655B] text-white flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <H3 className="text-xl font-semibold font-title text-gray-900">
                    {modalidad.titulo}
                  </H3>
                </div>

                {/* Lista de servicios */}
                <div className="space-y-3">
                  {modalidad.servicios.map((servicio, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-[#52655B] mt-7.5 mr-3 flex-shrink-0" />
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