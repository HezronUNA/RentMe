
import { H2, H4, P, Small } from "@/shared/components/Typography";
import { useModalidadesServicio } from ".";
import type { ModalidadConServicios } from "./type";
import { Button } from "@/shared/components/button";
import { Skeleton } from "@/shared/components/Skeleton";
import { useNavigate } from "@tanstack/react-router";
import { useTitles } from "@/shared/hooks/useTitles";


export default function ModalidadesServicio() {
  const { modalidades, loading, error } = useModalidadesServicio();
  const {items} = useTitles("5")

  if (loading) {
    return (
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-96 mx-auto mb-12" />
          <div className="grid lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-6" />
                <Skeleton className="h-8 w-48 mx-auto mb-6" />
                <Skeleton className="h-12 w-32 mx-auto mb-8" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  if (modalidades.length === 0) {
    return (
      <section className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg">No se encontraron modalidades de servicio.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <H2 className="text-center text-3xl md:text-4xl font-title uppercase mb-4">{items[4]?.titulo}
        </H2>
        <P className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {items[4]?.descripcion}
        </P>
        <div className="grid lg:grid-cols-3 gap-8">
          {modalidades.map((modalidad, index) => (
            <ModalidadCard 
              key={modalidad.id} 
              modalidad={modalidad} 
              numero={index + 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ModalidadCardProps = {
  modalidad: ModalidadConServicios;
  numero: number;
};

function ModalidadCard({ modalidad, numero }: ModalidadCardProps) {
  const navigate = useNavigate();
  const hasServiciosIncluidos = modalidad.serviciosIncluidosData && modalidad.serviciosIncluidosData.length > 0;
  const hasServiciosAdicionales = modalidad.serviciosAdicionalesData && modalidad.serviciosAdicionalesData.length > 0;
  return (
    <div className="bg-neutral-50 border border-zinc-200 rounded-2xl p-8 shadow-lg hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300 flex flex-col h-full border border-gray-100">
      {/* Número circular */}
      <div className="w-16 h-16 bg-[#52655B] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
        <span className="text-2xl font-bold">{numero}</span>
      </div>

      {/* Título */}
      <H4 className="text-center mb-4">
        {modalidad.nombre}
      </H4>

      {/* Botón de acción */}
      <div className="flex justify-center mb-8">
        <Button
          variant="green"
          className="px-8 hover:cursor-pointer hover:bg-[#435349]"
          onClick={() => navigate({ to: `/servicios/${modalidad.id}` })}
        >
          <Small className="font-medium">
            {modalidad.textBoton || 'Reservar'}
          </Small>
        </Button>
      </div>

      {/* Servicios - Contenido principal */}
      <div className="flex-1">
        {hasServiciosIncluidos && (
          <div className="mb-6">
            <P className="text-sm font-semibold text-gray-700 mb-4">
              Esta modalidad incluye:
            </P>
            <ul className="space-y-6">
              {modalidad.serviciosIncluidosData.map((servicio, idx) => (
                <li key={typeof servicio === "object" && "id" in servicio ? servicio.id : idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <svg 
                      className="w-4 h-4 text-green-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {typeof servicio === "string" ? servicio : servicio.nombre}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasServiciosAdicionales && (
          <div>
            <P className="text-sm font-semibold text-gray-700 mb-4">
              Además de eso incluye:
            </P>
            <ul className="space-y-6">
              {modalidad.serviciosAdicionalesData.map((servicio, idx) => (
                <li key={typeof servicio === "object" && "id" in servicio ? servicio.id : idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <svg 
                      className="w-4 h-4 text-green-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {typeof servicio === "string" ? servicio : servicio.nombre}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Si no hay servicios */}
        {!hasServiciosIncluidos && !hasServiciosAdicionales && (
          <div className="text-center py-8">
            <P className="text-gray-500 text-sm">
              Los detalles de esta modalidad se están cargando...
            </P>
          </div>
        )}
      </div>
    </div>
  );
}
