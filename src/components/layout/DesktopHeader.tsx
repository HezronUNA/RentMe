import { Link } from "@tanstack/react-router"
import type { UseNavbar } from "@/hooks/useNavbar"
import { Small } from "@/components/ui/Typography"

type Props = {
  nav: UseNavbar
}

export default function DesktopHeader({ nav }: Props) {
  const {
    getLinkClass,
  } = nav

  return (
    <div className="mx-auto max-w-screen-2xl hidden md:block">
      <div className="h-24 w-full grid grid-cols-3 items-center px-6">
        {/* Left nav (right-aligned) */}
        <nav className="flex justify-end items-center gap-6">
          <Link to="/tours" className={`${getLinkClass("/tours")} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">TOURS</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>

          <Link to="/ventas" className={`${getLinkClass("/ventas")} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">VENTAS</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>

          <Link to="/alojamientos" className={`${getLinkClass("/alojamientos")} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">ALOJAMIENTOS</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>
        </nav>

        {/* Center logo */}
        <div className="flex justify-center">
          <Link to="/" aria-label="Ir al inicio" className="block">
            <img src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png" alt="Logo RentME" className="h-20 w-20 object-contain" />
          </Link>
        </div>

        {/* Right nav (left-aligned) */}
        <nav className="flex justify-start items-center gap-6">
          <Link to="/nosotros" className={`${getLinkClass("/nosotros")} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">SOBRE NOSOTROS</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>
          <Link
            to="/servicios"
            onClick={() => nav.setIsServiciosFromAlojamientos(false)}
            className={`${nav.isActive("/servicios") && !nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">SERVICIOS</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>
          <Link to="/administracion" className={`${getLinkClass("/administracion")} relative group`}>
            <Small className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 relative z-10">ADMINISTRACIÓN</Small>
            <span className="absolute left-0 -bottom-1 h-px w-full scale-x-0 origin-left bg-[#52655B] transition-transform duration-200 group-hover:scale-x-100"></span>
          </Link>
        </nav>
      </div>
    </div>
  )
}


