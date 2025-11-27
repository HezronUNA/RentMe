import BannerAboutUs from "./sections/banner";
import OurObjetiveSection from "./sections/ourObjetive";
import { Promotions } from "./sections/propertyPromotions/promotion";
import WaysWork from "./sections/waysWork/WaysWork";
import WhatWeDo from "./sections/whatWeDo/WhatWeDo";


export default function AboutUsPage() {
  return (
    <>
       <BannerAboutUs />
       <WhatWeDo/>
       <Promotions />
       <WaysWork />
      <OurObjetiveSection />
    </>
  ) 
}
