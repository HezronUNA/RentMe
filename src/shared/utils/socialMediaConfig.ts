import type { SocialConfig } from "../types/socialMedia";

/**
 * Cambiá acá tus enlaces/teléfono/mensaje.
 * Nada de Firebase: es config local y tipada.
 */
export const SOCIAL_CONFIG: SocialConfig = [
  {
    platform: 'whatsapp',
    bg: 'bg-green-500',
    label: 'WhatsApp',
    phone: '50683888231',
    message:
      '¡Hola Rent Me CR! Quiero información sobre alojamientos y administración de propiedades.',
  },
  {
    platform: 'instagram',
    bg: 'bg-pink-500',
    label: 'Instagram',
    url: 'https://www.instagram.com/rentmecr/',
  },
  {
    platform: 'tiktok',
    bg: 'bg-black',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@rent_me_cr',
  },
  {
    platform: 'facebook',
    bg: 'bg-blue-600',
    label: 'Facebook',
    url: 'https://www.facebook.com/rentmecr',
  },
]
