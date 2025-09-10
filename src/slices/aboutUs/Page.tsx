import BannerAboutUs from "./sections/banner";
import OurObjetiveSection from "./sections/ourObjetive";
import OurTeam from "./sections/ourTeam/OurTeam";
import { Promotions } from "./sections/propertyPromotions/promotion";
import WaysWork from "./sections/waysWork/WaysWork";
import WhatWeDo from "./sections/whatWeDo/WhatWeDo";


export default function AboutUsPage() {
  return (
    <section>
        <BannerAboutUs />
       <WhatWeDo/>
       <OurTeam/>
      <Promotions />
       <WaysWork />
      <OurObjetiveSection />
    </section>
  ) 
}
