import CleaningServiceHero from "./sections/cleaningWork/CleaningWork";
import { ServiceHero } from "./sections/heroService/ServiceHero";
import PhotograpyPage from "./sections/photograpyService/PhotograpyPage";
import SalesService from "./sections/salesService/SalesService";
import WaysWork from "./sections/waysWork/WaysWork";


export default function AboutUsPage() {
  return (
    <section>
      <ServiceHero />
      <WaysWork />
      <CleaningServiceHero />
      <PhotograpyPage />
      <SalesService/>
    </section>
  )
}
