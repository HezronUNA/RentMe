// Tipos fuertemente tipados para la barra social

export type Platform = 'whatsapp' | 'instagram' | 'tiktok' | 'facebook'

type Common = {
  /** Identificador de la plataforma */
  platform: Platform
  /** Texto accesible (tooltip/aria) - si no se define, se infiere por plataforma */
  label?: string
  /** Clase de fondo (Tailwind) */
  bg: string
}

/** Config específica para WhatsApp */
export type WhatsAppEntry = Common & {
  platform: 'whatsapp'
  /** Teléfono en formato internacional sin signos (e.g. 50683888231) */
  phone: string
  /** Mensaje opcional que se pre-cargará en el chat */
  message?: string
}

/** Config para plataformas que usan una URL directa */
export type UrlEntry = Common & {
  platform: Exclude<Platform, 'whatsapp'>
  /** URL absoluta al perfil de la red social */
  url: string
}

/** Entrada genérica de configuración */
export type SocialEntry = WhatsAppEntry | UrlEntry

/** Configuración completa: una lista de entradas */
export type SocialConfig = SocialEntry[]

/** Helpers */
export function buildWhatsAppHref(phone: string, message?: string) {
  const clean = phone.replace(/[^\d]/g, '')
  const encoded = message ? `?text=${encodeURIComponent(message)}` : ''
  return clean ? `https://wa.me/${clean}${encoded}` : '#'
}
