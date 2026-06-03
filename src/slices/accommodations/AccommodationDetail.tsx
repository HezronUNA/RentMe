import { useParams } from "@tanstack/react-router";
import { ReservationForm } from "./components/ReservationForm";
import { AccommodationNavBar } from "./components/AccommodationNavBar";
import AccommodationImageGallery from "./components/AccommodationImageGallery";
import AccommodationLocationMap from "./components/AccommodationLocationMap.tsx";
import { useHospedajeDetail } from "./hooks/useHospedajeDetail";
import { useHospedajeReglas } from "./hooks/useHospedajeReglas";
import { useHospedajeServicios } from "./hooks/useHospedajeServicios";
import ReviewAccommodation from "./components/ReviewAccommodation";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

const AccommodationDetail = () => {
  const params = useParams({ from: "/alojamientos/$alojamientoId" });
  const accommodationId = params.alojamientoId;

  // Obtener datos desde Supabase
  const { hospedaje, loading: hospedajeLoading, error: hospedajeError } = useHospedajeDetail(accommodationId);
  const { reglas, loading: reglasLoading } = useHospedajeReglas(accommodationId);
  const { servicios, loading: serviciosLoading } = useHospedajeServicios(accommodationId);

  const isLoading = hospedajeLoading || reglasLoading || serviciosLoading;

  if (isLoading) {
    return (
      <section className="w-full min-h-screen bg-[#f4f7f5] py-12">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="relative h-96 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(82,101,91,0.18)_0%,rgba(82,101,91,0.06)_48%,rgba(27,51,40,0.14)_100%)] shadow-[0_18px_40px_rgba(82,101,91,0.10)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_42%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 rounded-2xl bg-white/80 p-5 shadow-[0_12px_30px_rgba(82,101,91,0.06)] backdrop-blur-sm">
                  <div className="h-6 rounded-full bg-[linear-gradient(90deg,rgba(82,101,91,0.18),rgba(82,101,91,0.08),rgba(82,101,91,0.18))]" />
                  <div className="h-4 w-3/4 rounded-full bg-[linear-gradient(90deg,rgba(82,101,91,0.14),rgba(82,101,91,0.06),rgba(82,101,91,0.14))]" />
                  <div className="h-4 w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(82,101,91,0.14),rgba(82,101,91,0.06),rgba(82,101,91,0.14))]" />
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-xl bg-[linear-gradient(90deg,rgba(82,101,91,0.12),rgba(82,101,91,0.05),rgba(82,101,91,0.12))]" />
                    <div className="h-20 rounded-xl bg-[linear-gradient(90deg,rgba(82,101,91,0.12),rgba(82,101,91,0.05),rgba(82,101,91,0.12))]" />
                    <div className="h-20 rounded-xl bg-[linear-gradient(90deg,rgba(82,101,91,0.12),rgba(82,101,91,0.05),rgba(82,101,91,0.12))]" />
                    <div className="h-20 rounded-xl bg-[linear-gradient(90deg,rgba(82,101,91,0.12),rgba(82,101,91,0.05),rgba(82,101,91,0.12))]" />
                  </div>
                </div>
                <div className="h-64 rounded-2xl bg-[linear-gradient(135deg,rgba(82,101,91,0.16)_0%,rgba(82,101,91,0.06)_48%,rgba(27,51,40,0.12)_100%)] shadow-[0_12px_30px_rgba(82,101,91,0.08)]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hospedajeError || !hospedaje) {
    return (
      <section className="w-full py-12">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {hospedajeError ? "Error al cargar el hospedaje" : "Hospedaje no encontrado"}
            </h2>
            <p className="text-gray-600 mb-6">
              {hospedajeError || "El hospedaje que buscas no existe o ha sido removido."}
            </p>
            <Button
              onClick={() => window.history.back()}
              variant={"green"}
            >
              Volver atrás
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full font-sans">
      {/* Navbar - Desktop y Mobile */}
      <AccommodationNavBar />

      {/* Galería de imágenes principal */}
      <div id="fotos" className="px-4 md:px-8 lg:px-16 py-8 pt-20 md:pt-28">
        <div className="w-full max-w-7xl mx-auto">
          <AccommodationImageGallery
            images={hospedaje.imagenes || []}
            alt={`Hospedaje ${hospedaje.nombre} en ${hospedaje.ubicacion}`}
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
                  {hospedaje.ubicacion}
                </p>
              </header>

              {/* Encabezado con acento lateral + línea divisoria */}
              <section id="detalle" className="mt-8 scroll-mt-32">
                <div className="h-px bg-gray-300" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-5 w-1 bg-[#52655B]" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Detalles del hospedaje</h3>
                </div>
              </section>

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
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.banos}</p>
                    </div>
                    <div className="px-4 py-4 border-b border-gray-200 bg-white">
                      <p className="text-xs text-gray-500">Capacidad</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{hospedaje.num_huespedes} huéspedes</p>
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
                  <p className="mt-4 text-gray-700 leading-relaxed max-w-prose whitespace-pre-line">{hospedaje.descripcion}</p>
                </section>
              )}

              {/* Servicios */}
              {servicios && servicios.length > 0 && (
                <section id="servicios" className="mt-10 scroll-mt-32">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Servicios incluidos</h3>
                    </div>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-2">
                    {servicios.map((item) => (
                      <li key={item.servicio.id} className="flex items-start gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5 text-[#52655B] mt-1">
                          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-700">{item.servicio.nombre}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Reglas del hospedaje */}
              {reglas && reglas.length > 0 && (
                <section className="mt-10">
                  <div>
                    <div className="h-px bg-gray-300" />
                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-5 w-1 bg-[#52655B]" />
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Reglas del hospedaje</h3>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reglas.map((item) => (
                      <div key={item.regla.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-[#52655B] mt-0.5 flex-shrink-0">
                          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.regla.nombre}</p>
                          {item.regla.descripcion && (
                            <p className="text-xs text-gray-600 mt-1">{item.regla.descripcion}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Columna derecha: Formulario sticky */}
            <aside id="reservation-form" className="w-full self-start lg:sticky lg:top-32 xl:top-60">
              <h3 className="text-2xl font-bold text-[#52655B] mb-2">
                Reserva tu estadía
              </h3>
              <p className="text-sm text-[#52655B] mb-4">Completa el formulario para hacer tu reserva.</p>
              <ReservationForm
                accommodationId={accommodationId}
                accommodationName={hospedaje.nombre}
                pricePerNight={hospedaje.precio_noche}
                maxGuests={hospedaje.num_huespedes}
              />
            </aside>
          </div>

          {/* Mapa de ubicación */}
          <div id="ubicacion" className="w-full py-8 scroll-mt-32">
            <AccommodationLocationMap googleMapsUrl={hospedaje.google_maps_url} />
          </div>
        </div>
      </div>
      <Toaster />
      {/* Sección Reseñas */}
      <div id="resenas" className="scroll-mt-32">
        <ReviewAccommodation />
      </div>
    </section>
  );
};

export default AccommodationDetail;

