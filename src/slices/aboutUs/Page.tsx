import BannerAboutUs from "./sections/banner";
import OurObjetiveSection from "./sections/ourObjetive";
import WhatWeDo from "./sections/whatWeDo/WhatWeDo";


export default function AboutUsPage() {
  return (
    <section>
        <BannerAboutUs />
       <WhatWeDo/>
      <OurObjetiveSection />
    </section>
  ) 
}
