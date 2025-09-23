import { useParams } from "@tanstack/react-router";
import { Toaster } from "@/shared/components/Sonner";
import { ContactForm } from "./components/ContactForm";

const SaleDetail = () => {
  const params = useParams({ from: "/ventas/$ventaId" });
  const propertyId = params.ventaId;

  return (
    <section className="w-full">

      {/* Contenido en columnas: galería de imágenes y formulario */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Galería de imágenes / Información de la propiedad */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <div className="w-full bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información de la Propiedad
              </h2>
              {/* Aquí irá el carrusel de imágenes y detalles de la propiedad */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Galería de imágenes</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-bold text-[#52655B]">₡150,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Habitaciones:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Baños:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Área del terreno:</span>
                  <span className="font-medium">200 m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <ContactForm propertyId={propertyId} propertyTitle="Propiedad en venta" />
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default SaleDetail;
