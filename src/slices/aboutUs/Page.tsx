import BannerAboutUs from "./sections/BannerAboutUs";
import OurObjetiveSection from "./sections/OurObjetive";
import { Promotions } from "./sections/propertyPromotions/promotion";
import WhatWeDo from "./sections/WhatWeDo";

export default function AboutUsPage() {
  return (
    <>
       <BannerAboutUs />
       <WhatWeDo />
       <Promotions />
      <OurObjetiveSection />
    </>
  ) 
}
