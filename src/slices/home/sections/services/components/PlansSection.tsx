import { H2, P } from "@/shared/components/Typography"
import usePlans from "@/slices/home/hooks/usePlans"

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800 mb-4">
            SOLUCIONES INMOBILIARIAS INTEGRALES
          </H2>
          <P className="text-lg text-gray-600 max-w-3xl mx-auto">
            Asesoría personalizada en gestión, venta y compra de propiedades en Costa Rica.
          </P>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {PlanesGestion.map((plan, index) => {

            const getCardSize = (index: number) => {
              const layout = [
                "col-span-2 h-64", // Primera: rectangular (2 columnas)
                "col-span-1 h-64", // Segunda: cuadrada (1 columna)
                "col-span-1 h-64", // Tercera: cuadrada (1 columna)
                "col-span-1 h-64", // Cuarta: cuadrada (1 columna) 
                "col-span-1 h-64", // Quinta: cuadrada (1 columna)
                "col-span-2 h-64", // Sexta: rectangular (2 columnas)
              ]
              return layout[index] || "col-span-1 h-64" // Fallback para más elementos
            }

            // Determine text size based on card dimensions
            const getTextSize = (index: number) => {
              // Rectangular cards (wider) get slightly larger text
              if (index === 0 || index === 5) {
                return "text-xl md:text-2xl"
              }
              // Square cards get smaller text
              return "text-lg md:text-xl"
            }

            return (
              <div 
                key={`${plan.id}-${index}`}
                className={`group relative overflow-hidden cursor-pointer border border-gray-200/50 hover:border-gray-300 transition-all duration-300 ${getCardSize(index)}`}
              >
                {/* Background image - not affected by hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: plan.image ? `url(${plan.image})` : ``
                  }}
                ></div>

             
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-70 transition-opacity duration-700"></div>

              
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 px-4">
                  <h3 className={`${getTextSize(index)} font-light text-center mb-4 tracking-wider uppercase line-clamp-2`}>
                    {plan.title || 'Servicio'}
                  </h3>
                  
                  <button className="border border-white rounded-md px-6 py-2 text-sm font-normal tracking-wider hover:bg-white hover:text-gray-800 transition-all duration-300">
                    {plan.textbutton || "Ver mas"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}