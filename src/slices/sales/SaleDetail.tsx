import { useParams } from "@tanstack/react-router";
import { Toaster } from "@/shared/components/Sonner";
import { ContactForm } from "./components/ContactForm";
import PropertyImageGallery from "./components/PropertyImageGallery";
import { PropertyLocationMap } from "./components/PropertyLocationMap";
import { usePropiedadById } from "./hooks/usePropiedadById";

const SaleDetail = () => {
  const params = useParams({ from: "/ventas/$ventaId" });
  const propertyId = params.ventaId;
  
  // Obtener datos de la propiedad
  const { propiedad, loading, error } = usePropiedadById(propertyId);

  // Mostrar loading mientras se cargan los datos
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

  // Mostrar error si no se pueden cargar los datos
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

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="w-full">
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
          
          {/* Contenido en columnas: información de la propiedad y formulario */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8">
            {/* Información de la propiedad */}
            <div className="w-full lg:w-1/2 flex justify-center items-start">
              <div className="w-full bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Propiedad en {propiedad.ubicacion.distrito}
              </h1>
              <h2 className="text-lg text-gray-600 mb-6">
                {propiedad.ubicacion.canton}
              </h2>
              
              {/* Descripción */}
              {propiedad.descripcion && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{propiedad.descripcion}</p>
                </div>
              )}
              
              {/* Detalles principales */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-bold text-[#52655B] text-xl">₡{formatPrice(propiedad.precio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className={`font-medium px-2 py-1 rounded text-sm ${
                    propiedad.estado === 'Disponible' ? 'bg-green-100 text-green-800' :
                    propiedad.estado === 'Reservada' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {propiedad.estado}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Habitaciones:</span>
                  <span className="font-medium">{propiedad.habitaciones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Baños:</span>
                  <span className="font-medium">{propiedad.baños}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Área del terreno:</span>
                  <span className="font-medium">{propiedad.areaTerreno} m²</span>
                </div>
                {propiedad.añoConstruccion && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Año de construcción:</span>
                    <span className="font-medium">{propiedad.añoConstruccion}</span>
                  </div>
                )}
              </div>

              {/* Amenidades */}
              {propiedad.amenidades && propiedad.amenidades.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {propiedad.amenidades.map((amenidad, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {amenidad}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

            {/* Formulario de contacto */}
            <div className="w-full lg:w-1/2 flex justify-center items-start">
              <ContactForm 
                propertyId={propertyId} 
                propertyTitle={`Propiedad en ${propiedad.ubicacion.distrito}, ${propiedad.ubicacion.canton}`} 
              />
            </div>
          </div>

          {/* Mapa de ubicación */}
          <div className="w-full">
            <PropertyLocationMap 
              ubicacionExacta={propiedad.ubicacionExacta}
            />
          </div>

        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default SaleDetail;

