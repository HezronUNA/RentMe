import { useParams } from "@tanstack/react-router";
import CarouselService from "./sections/serviceDetail/components/CarouselService";
import Hero from "./sections/serviceDetail/components/Hero";
import { ServiceReservationForm } from "./sections/serviceDetail/components/ServiceReservationForm";
import { Toaster } from "@/shared/components/Sonner";

const ServiceDetailPage = () => {
  const params = useParams({ from: "/servicios/$modalidadId" });
  const modalidadId = params.modalidadId;

  return (
    <section className="w-full">
      {/* Hero ancho completo */}
      <Hero />

      {/* Contenido en columnas: carrusel y formulario */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Carrusel */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <CarouselService modalidadId={modalidadId} />
          </div>

          {/* Formulario */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <ServiceReservationForm />
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ServiceDetailPage;
