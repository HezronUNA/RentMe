
import { H3, P } from "@/shared/components/Typography";
import { Button } from "@/shared/components/Button";
import { useState } from "react";
import { useServiciosByModalidad } from "@/slices/services/hooks/useServiceByModality";

export default function CarouselService({ modalidadId }: { modalidadId: string }) {
  const { data, isLoading, error } = useServiciosByModalidad(modalidadId);
  const [current, setCurrent] = useState(0);

  // Map API data to Servicio type
  const servicios: Servicio[] = (data || []).map((item: any) => ({
    imagen: item.imagen,
    nombre: item.nombre ?? "Sin nombre",
    descripcion: item.descripcion ?? "Sin descripción",
  }));

  if (isLoading) return <div className="py-12 text-center">Cargando servicios...</div>;
  if (error) return <div className="py-12 text-center text-red-600">Error al cargar servicios</div>;
  if (!servicios || servicios.length === 0) return <div className="py-12 text-center">No hay servicios disponibles</div>;

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? servicios.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === servicios.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full py-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="whiteBorder" onClick={handlePrev}>&lt;</Button>
          <div className="w-full max-w-md">
            {servicios[current] ? (
              <ServicioCard servicio={servicios[current]} />
            ) : (
              <div className="text-center text-gray-400">Servicio no disponible</div>
            )}
          </div>
          <Button variant="whiteBorder" onClick={handleNext}>&gt;</Button>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          {servicios.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-green-600" : "bg-gray-300"}`}
              onClick={() => setCurrent(idx)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type Servicio = {
  imagen?: string;
  nombre: string;
  descripcion: string;
};

function ServicioCard({ servicio }: { servicio: Servicio }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
      <div className="mb-4 w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {servicio.imagen ? (
          <img src={servicio.imagen} alt={servicio.nombre} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>
      <H3 className="text-lg font-semibold mb-2 text-center">{servicio.nombre}</H3>
      <P className="text-gray-600 text-center">{servicio.descripcion}</P>
    </div>
  );
}