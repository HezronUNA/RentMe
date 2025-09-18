import { useTitles } from "@/shared/hooks/useTitles";
import { H1 } from "@/shared/components/Typography";

export default function CleaningServiceHero() {
  const { items, loading, error } = useTitles("4");

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!items || items.length === 0) {
    return <div>No se encontró el servicio</div>;
  }

  const imagen = items[1]?.imagen;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: imagen ? `url("${imagen}")` : undefined,
      }}
    >
      {/* Overlay con opacidad */}
      <div className="absolute inset-0 bg-black/70 bg-opacity-50"></div>
      <div className="relative max-w-2xl mx-auto px-8 text-white pt-42">
        <H1 className="mb-6 text-center">{items[1].titulo}</H1>
        <p className="text-lg md:text-xl leading-relaxed text-center">
          {items[1].descripcion}
        </p>
      </div>
    </div>
  );
}