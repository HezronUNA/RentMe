import { AccommodationNavBarDesktop } from "./AccommodationNavBarDesktop";
import { AccommodationNavBarMobile } from "./AccommodationNavBarMobile";

export function AccommodationNavBar() {
  return (
    <>
      {/* Desktop navbar - oculto en mobile */}
      <div className="hidden md:block">
        <AccommodationNavBarDesktop />
      </div>

      {/* Mobile navbar - oculto en desktop */}
      <div className="md:hidden">
        <AccommodationNavBarMobile />
      </div>
    </>
  );
}
