
import { Camera, Video, Edit3, Image as ImageIcon } from 'lucide-react'
import type { PhotographyService, PhotographyItem } from './type'
import { useTitles } from '@/shared/hooks/useTitles'
import { usePhotographyServices } from '../../hooks/usePhotograpy'
import { Button } from '@/shared/components/Button'
import { H2, P } from '@/shared/components/Typography'

function ServiceIcon({ name }: { name?: string }) {
  switch ((name || '').toLowerCase()) {
    case 'camera':
      return <Camera className="h-5 w-5 text-white" />
    case 'video':
    case 'videos':
      return <Video className="h-5 w-5 text-white" />
    case 'edit':
    case 'edicion':
      return <Edit3 className="h-5 w-5 text-white" />
    default:
      return <ImageIcon className="h-5 w-5 text-white" />
  }
}

export default function PhotograpyPage() {
  // titles hook (se pasa el slug/coleccion; ajusta si tu hook usa otro param)
  const { items: titles } = useTitles('8')

  const { data: services } = usePhotographyServices()
  const service: PhotographyService | undefined = services && services.length > 0 ? services[0] : undefined

  const items: PhotographyItem[] = service?.items ?? [
    { titulo: 'Fotografías profesionales del alojamiento', descripcion: 'Interior y exterior', icono: 'camera' },
    { titulo: 'Videos promocionales cortos', descripcion: 'Reels y TikToks', icono: 'video' },
    { titulo: 'Edición y optimización', descripcion: 'Para plataformas digitales', icono: 'edit' },
    { titulo: 'Sesión personalizada', descripcion: 'Según el estilo del hospedaje', icono: 'camera' },
  ]

  const image = service?.imagen || 'https://placehold.co/600x600'

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <H2>{titles[6]?.titulo}</H2>
          <P className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{titles[6]?.descripcion}</P>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-[50%_40%] gap-8 justify-center items-center">
          {/* Left column: descripción + características */}
          <div className="order-2 md:order-1"> 
            <div className="max-w-[640px] md:ml-auto justify-start mr-2">
            <p className="text-sm text-zinc-700 leading-relaxed mb-6">
              {service?.descripcion ??
                'En Rent Me CR ofrecemos servicios de fotografía, video y reels profesionales para resaltar los mejores ángulos de tu alojamiento. Nuestro contenido visual aumenta la visibilidad en plataformas como Airbnb, Booking y redes sociales, atrayendo más huéspedes y generando confianza.'}
            </p>

            <ul className="space-y-4">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-none rounded-full p-2 bg-[#52655B]">
                    <ServiceIcon name={it.icono} />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">{it.titulo}</div>
                    {it.descripcion && <div className="text-sm text-zinc-500">{it.descripcion}</div>}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center md:justify-start gap-3">
              <Button variant="green" size="lg" className='hover:cursor-pointer hover:bg-[#435349]'>
                Solicitar servicio
              </Button>
            </div>
            </div>
          </div>

          {/* Right column: imagen grande */}
          <div className="order-1 md:order-2 flex justify-center md:justify-start mr-2">
            <div className="relative w-full max-w-lg">
              <img
                src={image}
                alt={items[0]?.titulo ?? 'Fotografía del servicio'}
                className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
              />

              {/* badge abajo-izquierda */}
              <div className="absolute -left-4 -bottom-4 bg-white rounded-lg px-4 py-3 shadow-md flex items-center gap-3">
                <div className="bg-[#52655B] rounded-full p-2">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">Alta calidad</div>
                  <div className="text-xs text-zinc-500">Profesional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}