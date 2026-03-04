
import { Button } from "@/components/ui/button"
import { H2, P, Small } from "@/components/ui/Typography"
import { Link } from "@tanstack/react-router"

// Contenido estático de planes de gestión
const PLANES_GESTION = [
  {
    id: '1',
    title: 'Gestión de Alquileres',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
  },
  {
    id: '2',
    title: 'Venta de Propiedades',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'
  },
  {
    id: '3',
    title: 'Compra de Propiedades',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80'
  },
  {
    id: '4',
    title: 'Asesoría Legal',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'
  },
  {
    id: '5',
    title: 'Administración',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
  },
  {
    id: '6',
    title: 'Servicios Adicionales',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'
  }
]

export default function PlansSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <H2>
            SOLUCIONES INMOBILIARIAS INTEGRALES
          </H2>
          <P className="text-lg text-gray-600 max-w-3xl mx-auto">
            Asesoría personalizada en gestión, venta y compra de propiedades en Costa Rica.
          </P>
        </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {PLANES_GESTION.map((plan, index) => {

            const getCardSize = (index: number) => {
              // Use responsive col-span: on small screens every card is full width (col-span-1)
              // on sm+ screens we apply the designed layout. Heights are smaller on mobile.
              const layout = [
                "sm:col-span-2 col-span-1 h-48 sm:h-64", // Primera: rectangular (2 columnas en sm+)
                "col-span-1 h-48 sm:h-64", // Segunda: cuadrada
                "col-span-1 h-48 sm:h-64", // Tercera
                "col-span-1 h-48 sm:h-64", // Cuarta
                "col-span-1 h-48 sm:h-64", // Quinta
                "sm:col-span-2 col-span-1 h-48 sm:h-64", // Sexta: rectangular en sm+
              ]
              return layout[index] || "col-span-1 h-48 sm:h-64"
            }

            // Determine text size based on card dimensions (slightly smaller on mobile)
            const getTextSize = (index: number) => {
              if (index === 0 || index === 5) {
                return "text-lg sm:text-xl md:text-2xl"
              }
              return "text-base sm:text-lg md:text-xl"
            }

            return (
              <div 
                key={`${plan.id}-${index}`}
                className={`group relative overflow-hidden border border-gray-200/50 rounded-lg hover:border-gray-300 transition-all duration-300 ${getCardSize(index)}`}
              >
                {/* Background image - not affected by hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: plan.image ? `url(${plan.image})` : ``
                  }}
                ></div>

                {/* Overlay: visible by default on small screens, hidden on sm+ until hover */}
                <div className="absolute inset-0 bg-black opacity-50 sm:opacity-30 sm:group-hover:opacity-70 transition-opacity duration-700"></div>

                {/* Text: visible on small screens (no hover), hidden on sm+ until hover */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 px-4">
                  <P className={`${getTextSize(index)} text-sm sm:text-2xl text-center mb-4 uppercase`}>
                    {plan.title || 'Servicio'}
                  </P>
                  <Link to="/servicios">
                  <Button variant="whiteBorder" className="px-6 py-2 hover:bg-white hover:cursor-pointer transition-all duration-300">
                   <Small>
                    {plan.textbutton || "Ver mas"}
                   </Small>
                  </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

