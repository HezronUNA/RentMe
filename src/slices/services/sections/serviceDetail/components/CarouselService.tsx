import { H2, H4, P } from "@/shared/components/Typography";
import { useEffect, useState, useRef } from "react";
import { useServiciosByModalidad } from "@/slices/services/hooks/useServiceByModality";

export default function CarouselService({ modalidadId }: { modalidadId: string }) {
  const { data, isLoading, error } = useServiciosByModalidad(modalidadId);
  const [current, setCurrent] = useState(0);
  const setDirection = useState<'left' | 'right'>("right")[1];
  const animating = useRef(false);

  const servicios: Servicio[] = (data || []).map((item: any) => ({
    imagen: item.imagen,
    nombre: item.nombre ?? "Sin nombre",
    descripcion: item.descripcion ?? "Sin descripción",
  }));

  // Mostrar un solo card a la vez
  const getVisibleServicios = () => {
    if (servicios.length === 0) return [];
    return [servicios[current]];
  };
  useEffect(() => {
    if (!servicios || servicios.length === 0) return;
    const interval = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % servicios.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [servicios]);

  const handleDotClick = (idx: number) => {
    if (animating.current || idx === current) return;
    setDirection(idx > current ? "right" : "left");
    setCurrent(idx);
  };

  if (isLoading) return <div className="py-12 text-center">Cargando servicios...</div>;
  if (error) return <div className="py-12 text-center text-red-600">Error al cargar servicios</div>;
  if (!servicios || servicios.length === 0) return <div className="py-12 text-center">No hay servicios disponibles</div>;

  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="flex flex-col items-center text-center mb-6 w-full">
          <H2 className="text-2xl font-bold text-gray-800">
            Servicios incluidos en esta modalidad
          </H2>
          <P className="text-gray-600 mt-2 max-w-md">
            Descubre los beneficios que recibirás al elegir esta opción.
          </P>
        </div>
        <div className="w-full overflow-hidden">
          <div
            className={`flex transition-transform duration-[1200ms] ease-in-out`}
            style={{
              width: `100%`,
              transform: `translateX(0)`
            }}
          >
            {getVisibleServicios().map((servicio, idx) => (
              <div key={idx} className="w-full px-2 flex-shrink-0">
                <ServicioCard servicio={servicio} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          {servicios.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-green-600" : "bg-gray-300"}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleDotClick(idx)}
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
    <div className="bg-white border border-zinc-200 rounded-xl shadow-lg p-0 flex flex-col items-center w-full">
      <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-100">
        {servicio.imagen ? (
          <img 
            src={servicio.imagen} 
            alt={servicio.nombre} 
            className="object-cover w-full " 
          />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>
      <div className="p-6 w-full flex flex-col items-center">
        <H4 className="text-black text-lg font-semibold mb-2 text-center">{servicio.nombre}</H4>
        <P className="text-gray-600 text-center">{servicio.descripcion}</P>
      </div>
    </div>
  );
}
