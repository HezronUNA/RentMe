import { H1 } from "@/components/ui/Typography";


export default function CleaningServiceHero() {
  // Contenido estático del título
  const heroData = {
    titulo: '¿QUERÉS TU PROPIEDAD IMPECABLE Y LISTA PARA RECIBIR?',
    descripcion: 'Ofrecemos un servicio de limpieza profesional con protocolos estrictos, productos de calidad y control visual. Perfecto para propietarios que quieren tranquilidad y huéspedes que quieren excelencia.',
    imagen: 'https://i.ibb.co/5xgNkPLQ/cleaningservice-1.jpg'
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: heroData.imagen ? `url("${heroData.imagen}")` : undefined,
      }}
    >
      {/* Overlay con opacidad */}
      <div className="absolute inset-0 bg-black/70 bg-opacity-50"></div>
      <div className="relative max-w-2xl mx-auto px-8 text-white pt-42">
        <H1 className="mb-6 text-center">{heroData.titulo}</H1>
        <p className="text-lg md:text-xl leading-relaxed text-center">
          {heroData.descripcion}
        </p>
      </div>
    </div>
  );
}
