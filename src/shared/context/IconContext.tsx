import { createContext } from "react"
import type { IconType } from "react-icons"
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"

// Tipos de plataformas soportadas
export type SocialMedia = "whatsapp" | "instagram" | "tiktok" | "facebook"

// Diccionario global de íconos
export const iconMap: Record<SocialMedia, IconType> = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebook,
}

// Contexto que contiene el diccionario de íconos
export const IconContext = createContext<Record<SocialMedia, IconType>>(iconMap)
