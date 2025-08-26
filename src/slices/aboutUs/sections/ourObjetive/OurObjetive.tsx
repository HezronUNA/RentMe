import { useObjetivo } from "../../hooks/useObjetive";


export default function OurObjetiveSection() {
  const { data, isLoading, isError } = useObjetivo();

  if (isLoading || !data) return null;
  if (isError) return <p>Error al cargar el objetivo.</p>;

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

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-regular tracking-widest uppercase mb-4">
            {data.titulo}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {data.subtitulo}
          </p>
        </div>
      </div>
    </section>
  );
}
