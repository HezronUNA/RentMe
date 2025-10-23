import { useParams } from "@tanstack/react-router";
import { Toaster } from "@/shared/components/Sonner";
import { ReservationForm } from "./components/ReservationForm";
import AccommodationImageGallery from "./components/AccommodationImageGallery";
import { AccommodationLocationMap } from "./components/AccommodationLocationMap";
import { useHospedajeById } from "./hooks/useAccommodationsById";
import NearbyActivitiesCarousel from "./components/NearbyActivitiesCarousel";
import type { CrearReservaHospedaje } from "./type";
import { useCreateReserve } from "./hooks/useCreateReserve";
import ReviewAccommodation from "./components/ReviewAccommodation";

const AccommodationDetail = () => {
  const params = useParams({ from: "/alojamientos/$alojamientoId" });
  const accommodationId = params.alojamientoId;

  const { hospedaje, loading, error } = useHospedajeById(accommodationId);

    const { createReservation } = useCreateReserve({
    pricePerNight: hospedaje?.precioNoche || 0
  });

  const handleCreateReservation = async (reservationData: CrearReservaHospedaje) => {
    try {
      const reservationId = await createReservation(reservationData);
      console.log('Reserva creada exitosamente con ID:', reservationId);
    } catch (error) {
      console.error('Error en el proceso de reserva:', error);
      throw error; // Re-lanzar para que el formulario lo maneje
    }
  };

  // Función para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR').format(price);
  };

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

  if (error || !hospedaje) {
    return (
      <section className="w-full py-12">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? "Error al cargar el hospedaje" : "Hospedaje no encontrado"}
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "El hospedaje que buscas no existe o ha sido removido."}
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

  return (
    <section className="w-full font-sans">
      {/* Galería de imágenes principal */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          <AccommodationImageGallery
            images={hospedaje.imagenes}
            alt={`Hospedaje ${hospedaje.nombre} en ${hospedaje.ubicacion.distrito}, ${hospedaje.ubicacion.canton}`}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 md:px-8 lg:px-16 pb-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Dos columnas con formulario sticky */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-10 xl:gap-16 mb-12">
            {/* Columna izquierda: detalles */}
            <article className="w-full">
              <header className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#52655B] leading-tight">
                  {hospedaje.nombre}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  {hospedaje.ubicacion.distrito}, {hospedaje.ubicacion.canton}, {hospedaje.ubicacion.provincia}
                </p>
              </header>

              {/* Encabezado con acento lateral + línea divisoria */}
              <div className="mt-2">
                <div className="h-px bg-gray-300" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-5 w-1 bg-[#52655B]" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Precio por noche</h3>
                </div>
              </div>

              {/* Precio */}
              <section className="mt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-3xl font-extrabold text-[#52655B] leading-none">
                    ₡{formatPrice(hospedaje.precioNoche)}
                  </p>
                  <span className="text-sm text-gray-600">por noche</span>
                  {hospedaje.destacado && (
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      Destacado
                    </span>
                  )}
                </div>
              </section>

              {/* Encabezado con acento lateral + línea divisoria */}
              <div className="mt-8">
                <div className="h-px bg-gray-300" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-5 w-1 bg-[#52655B]" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Detalles del hospedaje</h3>
                </div>
              </div>

              {/* Características principales */}
              <section className="mt-4">
                <div className="border-t border-l border-gray-200">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Cuartos</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.cuartos}</p>
                    </div>
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Camas</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.camas}</p>
                    </div>
                    <div className="px-4 py-4 border-r border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Baños</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.baños}</p>
                    </div>
                    <div className="px-4 py-4 border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Capacidad</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.camas} huéspedes</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Descripción */}
              {hospedaje.descripcion && (
                <section className="mt-10">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Descripción del hospedaje</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed max-w-prose">{hospedaje.descripcion}</p>
                </section>
              )}

              {/* Servicios */}
              {hospedaje.servicios && hospedaje.servicios.length > 0 && (
                <section className="mt-10">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Servicios incluidos</h3>
                    </div>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-2">
                    {hospedaje.servicios.map((servicio: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5 text-[#52655B] mt-1">
                          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-700">{servicio}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Reglas del hospedaje */}
              <section className="mt-10">
                <div>
                  <div className="h-px bg-gray-300" />
                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-5 w-1 bg-[#52655B]" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Reglas del hospedaje</h3>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className={`text-sm text-gray-700 ${hospedaje.reglas?.mascotas ? 'text-green-600' : 'text-red-600'}`}>
                      {hospedaje.reglas?.mascotas ? 'Se admiten mascotas' : 'No se admiten mascotas'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className={`text-sm text-gray-700 ${hospedaje.reglas?.fumado ? 'text-green-600' : 'text-red-600'}`}>
                      {hospedaje.reglas?.fumado ? 'Se permite fumar' : 'No se permite fumar'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Actividades cercanas */}
              <NearbyActivitiesCarousel hospedajeId={accommodationId} />
            </article>

            {/* Columna derecha: Formulario sticky */}
            <aside className="w-full self-start lg:sticky lg:top-32 xl:top-60">
              <h3 className="text-2xl font-bold text-[#52655B] mb-2">
                Reserva tu estadía
              </h3>
              <p className="text-sm text-[#52655B] mb-4">Completa el formulario para hacer tu reserva.</p>
              <ReservationForm
                accommodationId={accommodationId}
                accommodationName={hospedaje.nombre}
                pricePerNight={hospedaje.precioNoche}
                maxGuests={hospedaje.camas}
                onSubmit={handleCreateReservation}
              />
            </aside>
          </div>

          {/* Mapa de ubicación */}
          <div className="w-full">
            <AccommodationLocationMap ubicacion={hospedaje.ubicacion} />
          </div>
        </div>
      </div>
      <Toaster />
      <ReviewAccommodation />
    </section>
  );
};

export default AccommodationDetail;