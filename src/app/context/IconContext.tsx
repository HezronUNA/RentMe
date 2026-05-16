import { createContext } from "react"
import type { FC, SVGProps } from "react"
import { WhatsAppIcon, InstagramIcon, FacebookIcon, TikTokIcon } from "./icons"

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number }>

// Tipos de plataformas soportadas
export type SocialMedia = "whatsapp" | "instagram" | "tiktok" | "facebook"

// Diccionario global de íconos
export const iconMap: Record<SocialMedia, IconComponent> = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  facebook: FacebookIcon,
}

// Contexto que contiene el diccionario de íconos
export const IconContext = createContext<Record<SocialMedia, IconComponent>>(iconMap)


