import { H1 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CleaningServiceHero() {
  const heroData = {
    titulo: "Impecable, siempre",
    descripcion:
      "Ofrecemos un servicio de limpieza profesional con protocolos estrictos, productos de calidad y control visual. Perfecto para propietarios que quieren tranquilidad y huéspedes que quieren excelencia.",
    imagen: "https://images.unsplash.com/photo-1774192620915-1b70a930351c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWwlMjBob3RlbCUyMGx1eHVyeXxlbnwxfHx8fDE3Nzc0MzI3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  // small icon wrapper for the right card
  function IconBox({ children }: { children: React.ReactNode }) {
    return (
      <div className="p-2.5 bg-[#52655b]/10 rounded-lg shrink-0 w-10 h-10 flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="relative bg-cover bg-center" style={{ backgroundImage: heroData.imagen ? `url('${heroData.imagen}')` : undefined }}>
      {/* degradado lateral para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-white/20" />
      {/* degradado superior e inferior para difuminar el corte de la imagen */}
      <div className="absolute top-0 left-0 right-0 h-24 lg:h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 lg:h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left column */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#52655b]" />
                <span className="text-sm uppercase tracking-wider text-gray-600">Servicios de limpieza</span>
              </div>

              <H1 className="text-black text-center sm:text-start">Impecable,<br/>siempre</H1>

              <p className="text-xl sm:text-start text-center text-gray-700 max-w-lg">Limpieza profesional con protocolos tipo hotel. Tu propiedad lista para cada huésped.</p>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52655b]" />
                <span className="text-gray-800">Limpieza profunda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52655b]" />
                <span className="text-gray-800">Control de inventario</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52655b]" />
                <span className="text-gray-800">Supervisión constante</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#52655b]" />
                <span className="text-gray-800">Personal capacitado</span>
              </div>
            </div>

            <div className="flex flex-wrap flex justify-center sm:justify-start gap-4 pt-2">
              <Button asChild className="px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:cursor-pointer hover:bg-[#435349]" variant="green" size="lg">
                <Link to="/reservar-servicio" search={{ servicio: "Limpieza profesional" }}>
                  Solicitar servicio
                </Link>
              </Button>
            </div>
          </div>

          {/* Right floating card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="space-y-8">
                <div className="text-center py-6 border-b border-gray-100">
                  <div className="text-6xl mb-2">★★★★★</div>
                  <p className="text-sm text-gray-600">Excelencia garantizada</p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <IconBox>
                      <Sparkles className="w-5 h-5 text-[#52655b]" />
                    </IconBox>
                    <div>
                      <h3 className="text-gray-900 mb-1">Estándares de hotel</h3>
                      <p className="text-sm text-gray-600">Protocolos profesionales en cada servicio</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <IconBox>
                      <CheckCircle2 className="w-5 h-5 text-[#52655b]" />
                    </IconBox>
                    <div>
                      <h3 className="text-gray-900 mb-1">Verificación visual</h3>
                      <p className="text-sm text-gray-600">Control de calidad antes de cada check-in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <IconBox>
                      <Users className="w-5 h-5 text-[#52655b]" />
                    </IconBox>
                    <div>
                      <h3 className="text-gray-900 mb-1">Equipo experto</h3>
                      <p className="text-sm text-gray-600">Personal capacitado y supervisado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
