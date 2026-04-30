import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import { useNavbar } from "@/hooks/useNavbar"

export default function Header() {
  const nav = useNavbar()

  return (
    <header className={`w-full sticky top-0 z-40 transition-all duration-300 ${
      nav.open 
        ? "bg-gradient-to-b from-gray-100 to-gray-50" 
        : "bg-neutral-50"
    } shadow-[4px_4px_4px_rgba(0,0,0,0.25)]`}>
      <DesktopHeader nav={nav} />
      <MobileHeader nav={nav} />
    </header>
  )
}


