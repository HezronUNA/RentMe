import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import { useNavbar } from "@/shared/hooks/useNavbar"

export default function Header() {
  const nav = useNavbar()

  return (
    <header className="w-full sticky top-0 z-50 bg-neutral-50 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
      <DesktopHeader nav={nav} />
      <MobileHeader nav={nav} />
    </header>
  )
}
