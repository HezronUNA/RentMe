import { memo } from "react"
import { H2, P } from "@/components/ui/Typography"
import { Link } from "@tanstack/react-router"

const PLANES_GESTION = [
  {
    id: '1',
    title: 'Gestión de Alojamientos',
    textbutton: 'Ver más',
    hash: 'gestion-alojamientos',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
  },
  {
    id: '2',
    title: 'Limpieza Profesional',
    textbutton: 'Ver más',
    hash: 'limpieza-profesional',
    image: 'https://i.ibb.co/kVn27zV1/service-5.jpg'
  },
  {
    id: '3',
    title: 'Asesoría Fiscal Airbnb',
    textbutton: 'Ver más',
    hash: 'contabilidad-asesoria',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80'
  },
  {
    id: '4',
    title: 'Servicios Facturables',
    textbutton: 'Ver más',
    hash: 'contabilidad-asesoria',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'
  },
  {
    id: '5',
    title: 'Promoción y Venta/Alquiler',
    textbutton: 'Ver más',
    hash: 'venta-propiedades',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
  },
  {
    id: '6',
    title: 'Fotografía & Video',
    textbutton: 'Ver más',
    hash: 'fotografia-video',
    image: 'https://res.cloudinary.com/dmq5jbp3z/image/upload/f_auto,q_auto,w_auto/v1762383404/photo-1751107996106-ab89608a49b7_fakdgp.jpg'
  },
  {
    id: '7',
    title: 'Desarrollo de soluciones tecnológicas',
    textbutton: 'Ver más',
    hash: 'tecnologia',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
  }
]

function PlansSection() {
  // En móvil: todas las cards iguales excepto desarrollo tecnológico
  // En desktop: primera fila completa y cierre con un bloque ancho
  const getCardSize = (index: number) => {
    const layout = [
      "col-span-1 h-44 sm:col-span-2 sm:h-80 lg:col-span-1",
      "col-span-1 h-44 sm:col-span-1 sm:h-80 lg:col-span-1",
      "col-span-1 h-44 sm:col-span-1 sm:h-80 lg:col-span-1",
      "col-span-1 h-44 sm:col-span-1 sm:h-80 lg:col-span-1",
      "col-span-1 h-44 sm:col-span-1 sm:h-80 lg:col-span-1",
      "col-span-1 h-44 sm:col-span-2 sm:h-80 lg:col-span-1",
      "col-span-2 h-44 sm:col-span-2 sm:h-80 lg:col-span-2",
    ]
    return layout[index] || "col-span-1 h-44 sm:h-80 lg:col-span-1"
  }

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24 bg-white">
      {/* Blobs de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/40 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/48 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header centrado */}
        <div className="mb-12 text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Nuestros Servicios
          </p>
          <H2 className="max-w-2xl mx-auto text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
            Soluciones Inmobiliarias Integrales
          </H2>
          <P className="max-w-xl mx-auto text-sm text-gray-600 md:text-base">
            Asesoría personalizada en gestión, venta y compra de propiedades en Costa Rica.
          </P>
        </div>

        {/* Grid — 2 cols en móvil, 4 en desktop */}
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {PLANES_GESTION.map((plan, index) => (
            <Link to="/servicios" hash={`#${plan.hash}`} key={`${plan.id}-${index}`} className={getCardSize(index)}>
              <article
                className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(82,101,91,0.08)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(82,101,91,0.14)]"
              >
                {/* Background image */}
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/85 via-[#2f3a35]/30 to-transparent" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-3 sm:p-5 md:p-7">
                  <h3 className="text-xs font-semibold leading-4 text-white sm:text-base sm:leading-6 md:text-lg">
                    {plan.title}
                  </h3>

                  <P className="mt-1.5 sm:mt-3 max-w-sm text-[10px] sm:text-xs leading-4 sm:leading-5 text-white/78 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    Accede a nuestros servicios profesionales
                  </P>

                  <div className="mt-2 sm:mt-4 flex items-center gap-1.5 sm:gap-2 text-sm font-semibold text-white opacity-100 sm:opacity-0 sm:transition-all sm:duration-500 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-semibold text-white">
                      {plan.textbutton}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(PlansSection)