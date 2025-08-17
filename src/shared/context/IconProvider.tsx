import type { ReactNode } from "react"
import { IconContext, iconMap } from "./IconContext"

type Props = { children: ReactNode }

/** Proveedor de íconos globales */
export const IconProvider = ({ children }: Props) => {
  return <IconContext.Provider value={iconMap}>{children}</IconContext.Provider>
}
