import CleaningServiceHero from "@/components/plans/CleaningWork";
import { ServiceHero } from "@/components/plans/ServiceHero";

import PhotograpyPage from "@/components/plans/PhotograpyPage";
import SalesService from "@/components/plans/SalesService";
import TechnologySolutions from "@/components/plans/TechnologySolutions";
import WaysWork from "@/components/plans/WaysWork";
import TaxAdvisory from "@/components/plans/TaxAdvisory";

export default function ServicesPage() {
  return (
    <section>
      <ServiceHero />
      <div id="gestion-alojamientos" className="scroll-mt-20 md:scroll-mt-32"><WaysWork /></div>
        <div id="contabilidad-asesoria" className="scroll-mt-20 md:scroll-mt-32"><TaxAdvisory /></div>
      <div id="limpieza-profesional" className="scroll-mt-20 md:scroll-mt-32"><CleaningServiceHero /></div>
      <div id="fotografia-video" className="scroll-mt-20 md:scroll-mt-32"><PhotograpyPage /></div>
      <div id="venta-propiedades" className="scroll-mt-20 md:scroll-mt-32"><SalesService /></div>
      <div id="tecnologia" className="scroll-mt-20 md:scroll-mt-32"><TechnologySolutions /></div>
    </section>
  )
}
