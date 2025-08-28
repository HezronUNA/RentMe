import { Skeleton } from "@/shared/components/Skeleton";
import { useObjetivo } from "../../hooks/useObjetive";
import { H2, P } from "@/shared/components/Typography";

export default function OurObjetiveSection() {
  const { data, isLoading, isError } = useObjetivo();

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Imagen Skeleton */}
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-[300px] md:h-[400px] rounded-2xl" />
          </div>

          {/* Texto Skeleton */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" /> {/* Título */}
            <Skeleton className="h-6 w-full mx-auto md:mx-0" /> {/* Subtítulo */}
            <Skeleton className="h-6 w-5/6 mx-auto md:mx-0" /> {/* Línea extra */}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return <p>Error al cargar el objetivo.</p>;
  if (!data) return null;

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={data.imagen}
            alt="Equipo Rent Me CR"
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 font-title text-center md:text-left">
          <H2 className="text-3xl md:text-4xl font-regular uppercase mb-4">
            {data.titulo}
          </H2>
          <P className="text-gray-700 text-lg font-body">
            {data.subtitulo}
          </P>
        </div>
      </div>
    </section>
  );
}
