import { Link } from "@tanstack/react-router"
import type { UseNavbar } from "@/hooks/useNavbar"
import { Small } from "@/components/ui/Typography"

type Props = {
  nav: UseNavbar
}

export default function DesktopHeader({ nav }: Props) {
  const {
    getLinkClass,
    isActive,
  } = nav

  return (
    <div className="mx-auto max-w-screen-2xl hidden md:block">
      <div className="h-32 inline-flex w-full justify-center items-center gap-8">
        {/* Izquierda */}
        <div className="flex items-center justify-start gap-8">
          <Link to="/tours" className={`${getLinkClass("/tours")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">TOURS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>

          <Link to="/ventas" className={`${getLinkClass("/ventas")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">VENTAS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>

          <Link to="/alojamientos" className={`${getLinkClass("/alojamientos")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">ALOJAMIENTOS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
        </div>

        {/* Logo */}
        <Link to="/" aria-label="Ir al inicio" className="block">
          <img src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png"  alt="Logo RentME" className="h-28 w-28 object-contain" />
        </Link>

        {/* Derecha */}
        <div className="flex items-center justify-start gap-8">
          <Link to="/nosotros" className={`${getLinkClass("/nosotros")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">SOBRE NOSOTROS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
          <Link
            to="/servicios"
            onClick={() => nav.setIsServiciosFromAlojamientos(false)}
            className={`${nav.isActive("/servicios") && !nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink} relative group`}
          >
            <Small className="uppercase tracking-wide relative z-10">SERVICIOS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
          <Link to="/administracion" className={`${getLinkClass("/administracion")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">ADMINISTRACIÓN</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
        </div>
      </div>
    </div>
  )
}


