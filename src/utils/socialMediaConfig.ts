/**
 * Configuración de redes sociales - Datos reales del negocio
 * Cambiá acá tus enlaces, teléfono y mensajes.
 */
export const SOCIAL_CONFIG = [
  {
    platform: "whatsapp",
    bg: "bg-green-500",
    label: "WhatsApp",
    phone: "50683888231",
    message:
      "¡Hola Rent Me CR! Quiero información sobre alojamientos y administración de propiedades.",
  },
  {
    platform: "instagram",
    bg: "bg-pink-500",
    label: "Instagram",
    url: "https://www.instagram.com/dmr_rentals?igsh=eXBzNXFmYmR6OWU5",
  },
  {
    platform: "tiktok",
    bg: "bg-black",
    label: "TikTok",
    url: "https://www.tiktok.com/@dmrrentalscr?_r=1&_t=ZM-91VWp63bAzL",
  },
  {
    platform: "facebook",
    bg: "bg-blue-600",
    label: "Facebook",
    url: "https://www.facebook.com/share/1Jw4WEW697/",
  },
];

/**
 * Helper para construir enlaces de WhatsApp
 */
export function buildWhatsAppHref(phone: string, message?: string) {
  const clean = phone.replace(/[^\d]/g, "");
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return clean ? `https://wa.me/${clean}${encoded}` : "#";
}


