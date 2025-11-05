import { Button } from "@/shared/components/button"
import { H2, P, Small } from "@/shared/components/Typography"
import usePlans from "@/slices/home/hooks/usePlans"
import { Link } from "@tanstack/react-router"

export default function PlansSection() {
  const { PlanesGestion, loading, error } = usePlans()

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error al cargar los planes de gestión
          </div>
        </div>
      </section>
    )
  }

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
          {PlanesGestion.map((plan, index) => {

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