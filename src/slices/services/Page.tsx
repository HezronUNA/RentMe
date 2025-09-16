import { ServiceHero } from "./sections/heroService/ServiceHero";
import SalesService from "./sections/salesService/SalesService";
import WaysWork from "./sections/waysWork/WaysWork";

export default function AboutUsPage() {
  return (
    <section>
      <ServiceHero />
      <WaysWork />
      <SalesService/>
    </section>
  )
}
