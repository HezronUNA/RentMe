import { useParams } from "@tanstack/react-router";
import CarouselService from "./sections/serviceDetail/components/CarouselService"
import Hero from "./sections/serviceDetail/components/Hero"

const ServiceDetailPage = () => {
  const params = useParams({ from: "/servicios/$modalidadId" });
  const modalidadId = params.modalidadId;
  return (
    <section>
      <Hero/>
      <CarouselService modalidadId={modalidadId} />
    </section>
  );
}

export default ServiceDetailPage
