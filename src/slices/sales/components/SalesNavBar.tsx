import { SalesNavBarDesktop } from "./SalesNavBarDesktop"
import { SalesNavBarMobile } from "./SalesNavBarMobile"

interface SalesNavBarProps {
  propertyName?: string
}

export function SalesNavBar({ propertyName }: SalesNavBarProps) {
  return (
    <>
      {/* Desktop navbar - oculto en mobile */}
      <div className="hidden md:block">
        <SalesNavBarDesktop propertyName={propertyName} />
      </div>

      {/* Mobile navbar - oculto en desktop */}
      <div className="md:hidden">
        <SalesNavBarMobile propertyName={propertyName} />
      </div>
    </>
  )
}
