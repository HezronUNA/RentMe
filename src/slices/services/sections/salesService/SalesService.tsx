import { ModalidadesGrid } from '@/slices/services/components/ModalidadesGrid'

export const SalesService = () => {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            Modalidades de Servicio
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Elige la modalidad que mejor se adapte a tus necesidades y comienza a disfrutar de nuestros servicios.
          </p>
        </div>

        {/* Grid de modalidades con diseño exacto de Figma */}
        <ModalidadesGrid />
      </div>
    </section>
  )
}
