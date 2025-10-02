import { useParams } from "@tanstack/react-router";
import { Toaster } from "@/shared/components/Sonner";
import { ContactForm } from "./components/ContactForm";
import PropertyImageGallery from "./components/PropertyImageGallery";
import { PropertyLocationMap } from "./components/PropertyLocationMap";
import { usePropiedadById } from "./hooks/usePropiedadById";

const SaleDetail = () => {
  const params = useParams({ from: "/ventas/$ventaId" });
  const propertyId = params.ventaId;

  const { propiedad, loading, error } = usePropiedadById(propertyId);

  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-96 rounded-xl mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !propiedad) {
    return (
      <section className="w-full py-12">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? "Error al cargar la propiedad" : "Propiedad no encontrada"}
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "La propiedad que buscas no existe o ha sido removida."}
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Volver atrás
            </button>
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="w-full font-sans">
      {/* Galería de imágenes principal */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          <PropertyImageGallery
            images={propiedad.imagenes}
            alt={`Propiedad en ${propiedad.ubicacion.distrito}, ${propiedad.ubicacion.canton}`}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 md:px-8 lg:px-16 pb-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Dos columnas con formulario sticky en una sola tarjeta.
              El sticky se detiene al terminar este grid (antes del mapa). */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-10 xl:gap-16 mb-12">
            {/* Columna izquierda: detalles */}
            <article className="w-full">
              <header className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#52655B] leading-tight">
                  {propiedad.ubicacion.distrito}, {propiedad.ubicacion.canton}
                </h1>
              </header>

              {/* Encabezado con acento lateral + línea divisoria */}
              <div className="mt-2">
                <div className="h-px bg-gray-300" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-5 w-1 bg-[#52655B]" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Valor de la propiedad</h3>
                </div>
              </div>

              {/* Precio al inicio y estado */}
              <section className="mt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-3xl font-extrabold text-[#52655B] leading-none">
                    ₡{formatPrice(propiedad.precio)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        propiedad.estado === "Disponible"
                          ? "bg-green-500"
                          : propiedad.estado === "Reservada"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    {propiedad.estado}
                  </span>
                </div>
              </section>

              {/* Encabezado con acento lateral + línea divisoria */}
              <div className="mt-8">
                <div className="h-px bg-gray-300" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-5 w-1 bg-[#52655B]" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Detalles de la propiedad</h3>
                </div>
              </div>

              

              {/* Características principales - estilo minimal con tabla sin bordes redondeados */}
              <section className="mt-4">
                <div className="border-t border-l border-gray-200">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Habitaciones</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{propiedad.habitaciones}</p>
                    </div>
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Baños</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{propiedad.baños}</p>
                    </div>
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Área del terreno</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{propiedad.areaTerreno} m²</p>
                    </div>
                    {propiedad.añoConstruccion && (
                      <div className="px-4 py-4 border-b border-gray-200 md:border-r bg-white">
                        <p className="text-xs text-gray-500">Año de construcción</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{propiedad.añoConstruccion}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              

              {/* Descripción */}
              {propiedad.descripcion && (
                <section className="mt-10">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Descripción de la propiedad</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed max-w-prose">{propiedad.descripcion}</p>
                </section>
              )}

              {/* Amenidades */}
              {propiedad.amenidades && propiedad.amenidades.length > 0 && (
                <section className="mt-10">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Amenidades</h3>
                    </div>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-2">
                    {propiedad.amenidades.map((amenidad, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5 text-[#52655B] mt-1">
                          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-700">{amenidad}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* Columna derecha: Formulario sticky */}
            <aside className="w-full self-start lg:sticky lg:top-32 xl:top-60">
              <h3 className="text-2xl font-bold text-[#52655B] mb-2">
                Agenda una cita con el propietario
              </h3>
              <p className="text-sm text-[#52655B] mb-4">Completa el formulario para coordinar tu visita.</p>
              <ContactForm
                propertyId={propertyId}
                propertyTitle={`Propiedad en ${propiedad.ubicacion.distrito}, ${propiedad.ubicacion.canton}`}
              />
            </aside>
          </div>

          {/* Mapa de ubicación (el sticky se detiene antes de este bloque) */}
          <div className="w-full">
            <PropertyLocationMap ubicacionExacta={propiedad.ubicacionExacta} />
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default SaleDetail;