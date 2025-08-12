import { useEffect, useRef, useState } from "react"
import { useRouterState } from "@tanstack/react-router"

export type UseNavbar = ReturnType<typeof useNavbar>

export function useNavbar() {
  const [open, setOpen] = useState(false)                     // menú mobile
  const [openDrop, setOpenDrop] = useState(false)             // dropdown Alojamientos (desktop)
  const [openDropMobile, setOpenDropMobile] = useState(false) // dropdown Alojamientos (mobile)
  const [isServiciosFromAlojamientos, setIsServiciosFromAlojamientos] = useState(false)

  const router = useRouterState()
  const pathname = router.location.pathname
  const dropRef = useRef<HTMLDivElement>(null)

  // Reset de menús al navegar + limpiar contexto si salimos de /servicios
  useEffect(() => {
    setOpen(false)
    setOpenDrop(false)
    setOpenDropMobile(false)
    if (pathname !== "/servicios") setIsServiciosFromAlojamientos(false)
  }, [router.location.href, pathname])

  // Cerrar dropdown desktop con click afuera + ESC
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dropRef.current) return
      if (!dropRef.current.contains(e.target as Node)) setOpenDrop(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDrop(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  // Activo para Alojamientos (Huésped/Propietario)
  const isAlojaSectionActive =
    pathname.startsWith("/alojamientos") ||
    (pathname === "/servicios" && isServiciosFromAlojamientos)

  const linkBase =
    "relative rounded-full px-4 py-2 transition-colors duration-300 " +
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#52655B] after:transition-all after:duration-300"

  const inactiveLink =
    linkBase + " text-black hover:text-[#52655B] hover:bg-[#52655B]/10"

  const activeLink =
    linkBase + " text-[#52655B] bg-[#52655B]/20 font-medium"

  const getLinkClass = (path: string) => (isActive(path) ? activeLink : inactiveLink)

  return {
    // estado
    open,
    openDrop,
    openDropMobile,
    isServiciosFromAlojamientos,
    pathname,
    isAlojaSectionActive,

    // refs
    dropRef,

    // setters
    setOpen,
    setOpenDrop,
    setOpenDropMobile,
    setIsServiciosFromAlojamientos,

    // utils
    isActive,
    getLinkClass,
    classes: { linkBase, inactiveLink, activeLink },
  }
}
