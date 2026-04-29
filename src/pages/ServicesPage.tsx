import CleaningServiceHero from "@/components/plans/CleaningWork";
import { ServiceHero } from "@/components/plans/ServiceHero";
import PhotograpyPage from "@/components/plans/PhotograpyPage";
import SalesService from "@/components/plans/SalesService";
import WaysWork from "@/components/plans/WaysWork";

export default function ServicesPage() {
  return (
    <section>
      <ServiceHero />
      <WaysWork />
      <CleaningServiceHero />
      <PhotograpyPage />
      <SalesService />
    </section>
  )
}
