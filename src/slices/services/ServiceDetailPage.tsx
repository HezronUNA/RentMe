import { useParams } from "@tanstack/react-router";
import CarouselService from "./sections/serviceDetail/components/CarouselService";
import Hero from "./sections/serviceDetail/components/Hero";
import { ServiceReservationForm } from "./sections/serviceDetail/components/ServiceReservationForm";
import { Toaster } from "@/shared/components/sonner";

const ServiceDetailPage = () => {
  const params = useParams({ from: "/servicios/$modalidadId" });
  const modalidadId = params.modalidadId;

  return (
    <section className="w-full">
      {/* Hero ancho completo */}
      <Hero />

      {/* Contenido debajo sin tanto aire */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-12 flex flex-col md:flex-row gap-6">
        {/* Carrusel */}
        <div className="flex-1">
          <CarouselService modalidadId={modalidadId} />
        </div>

        {/* Formulario */}
        <div className="flex-1">
          <ServiceReservationForm />
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ServiceDetailPage;
