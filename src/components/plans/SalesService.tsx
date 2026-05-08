import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

// Datos estáticos de ejemplo — títulos y descripciones que aparecen en las cards
const ITEMS = [
  {
    id: "s1",
    titulo: "Mayor visibilidad",
    descripcion:
      "Publicación en múltiples plataformas y redes sociales para alcanzar más compradores potenciales.",
  },
  {
    id: "s2",
    titulo: "Asesoría profesional",
    descripcion:
      "Acompañamiento experto en cada paso del proceso de venta de tu propiedad.",
  },
  {
    id: "s3",
    titulo: "Cierre más rápido",
    descripcion:
      "Gestión eficiente de citas y seguimiento a interesados para acelerar tu venta.",
  },
  {
    id: "s4",
    titulo: "Promoción estratégica",
    descripcion:
      "Marketing dirigido con fotografías profesionales y descripciones detalladas.",
  },
  {
    id: "s5",
    titulo: "Proceso simplificado",
    descripcion:
      "Nos encargamos de toda la gestión para que vos solo te enfoques en el resultado.",
  },
  {
    id: "s6",
    titulo: "Experiencia garantizada",
    descripcion: "Años de experiencia en el mercado inmobiliario costarricense.",
  },
];

function IconPlaceholder() {
  // Usar un SVG simple consistente con el resto del proyecto
  return (
    <div className="w-12 h-12 rounded-lg bg-[#d9dbd9] flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#52655B]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function SalesService() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[#e7eee9]/45 blur-[95px] md:bg-[#e7eee9]/55 md:h-[32rem] md:w-[32rem] md:top-20" />
        <div className="absolute right-[-8rem] top-16 h-[28rem] w-[28rem] rounded-full bg-[#f1e8dc]/45 blur-[95px] md:bg-[#f1e8dc]/55 md:h-[32rem] md:w-[32rem] md:top-20" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold">
          Venta de Propiedades
        </p>
        <H2 className="sm:max-w-3xl mx-auto mt-3">
          ¿Querés vender tu propiedad? Nosotros te ayudamos.
        </H2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <article
              key={item.id}
              className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300"
              aria-labelledby={`card-${item.id}-title`}
            >
              <div className="flex items-start gap-4">
                <IconPlaceholder />
                <div>
                  <h3 id={`card-${item.id}-title`} className="text-lg font-semibold text-zinc-800">
                    {item.titulo}
                  </h3>
                </div>
              </div>

              <P className="text-sm text-zinc-600 mt-2 flex-1">{item.descripcion}</P>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="hover:cursor-pointer hover:bg-[#435349]" variant="green" size="lg">
            <Link to="/reservar-servicio" search={{ servicio: "Venta de propiedades" }}>
              Contactar Ahora
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
