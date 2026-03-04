import BannerAboutUs from "@/components/aboutUs/BannerAboutUs";
import OurObjetiveSection from "@/components/aboutUs/OurObjetive";
import { Promotions } from "@/components/aboutUs/propertyPromotions/promotion";
import WhatWeDo from "@/components/aboutUs/WhatWeDo";

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