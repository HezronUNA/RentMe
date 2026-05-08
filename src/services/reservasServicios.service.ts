import { supabase } from "@/api/supabase/client";
import { sanitizeForStorage } from "@/utils/sanitize";

export interface CreateReservaServicioInput {
  nombre: string;
  correo: string;
  telefono: string;
  servicio: string;
  mensaje?: string;
}

export interface ReservaServicioInsert {
  nombre_cliente: string;
  correo_electronico: string;
  telefono: string;
  servicio_interes: string;
  notas?: string | null;
  ip_address?: string | null;
}

type ReservaServicioInput = ReservaServicioInsert | CreateReservaServicioInput;

// Función para obtener la IP del cliente
async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || null;
  } catch (error) {
    console.warn('Error obteniendo IP del cliente:', error);
    return null;
  }
}

// Función para verificar rate limiting
async function checkRateLimit(email: string, phone: string, ip: string | null): Promise<void> {
  const now = Date.now();
  const oneMinuteAgo = now - 60000; // 1 minuto

  // Verificar por email + teléfono (combinación exacta)
  const { data: recentByContact, error: contactError } = await supabase
    .from('reservas_servicios')
    .select('id, created_at')
    .eq('correo_electronico', email)
    .eq('telefono', phone)
    .gte('created_at', new Date(oneMinuteAgo).toISOString())
    .limit(1);

  if (contactError) {
    console.warn('Error verificando rate limit por contacto:', contactError);
  } else if (recentByContact && recentByContact.length > 0) {
    throw new Error('Demasiadas solicitudes. Espera 1 minuto antes de enviar otra reserva.');
  }

  // Verificar por IP si está disponible
  if (ip) {
    const { data: recentByIP, error: ipError } = await supabase
      .from('reservas_servicios')
      .select('id, created_at')
      .eq('ip_address', ip)
      .gte('created_at', new Date(oneMinuteAgo).toISOString())
      .limit(1);

    if (ipError) {
      console.warn('Error verificando rate limit por IP:', ipError);
    } else if (recentByIP && recentByIP.length > 0) {
      throw new Error('Demasiadas solicitudes desde tu dirección IP. Espera 1 minuto.');
    }
  }
}

function normalizeReservaServicioData(reservaData: ReservaServicioInput): ReservaServicioInsert {
  if ("nombre_cliente" in reservaData) {
    return reservaData;
  }

  return {
    nombre_cliente: reservaData.nombre,
    correo_electronico: reservaData.correo,
    telefono: reservaData.telefono,
    servicio_interes: reservaData.servicio,
    notas: reservaData.mensaje || null,
  };
}

export async function createReservaServicio(input: ReservaServicioInput): Promise<string> {
  const payload = normalizeReservaServicioData(input);

  // Sanitize text fields
  const nombre_cliente = sanitizeForStorage(payload.nombre_cliente) ?? "";
  const correo_electronico = sanitizeForStorage(payload.correo_electronico) ?? "";
  const telefono = sanitizeForStorage(payload.telefono) ?? "";
  const servicio_interes = sanitizeForStorage(payload.servicio_interes) ?? "";
  const notas = sanitizeForStorage(payload.notas) ?? null;

  // Obtener IP del cliente
  const clientIP = await getClientIP();

  // Verificar rate limiting
  await checkRateLimit(correo_electronico, telefono, clientIP);

  const { data, error } = await supabase
    .from("reservas_servicios")
    .insert({
      nombre_cliente,
      correo_electronico,
      telefono,
      servicio_interes,
      notas,
      ip_address: clientIP,
    })
    .select();

  if (error) {
    console.error("Error creando reserva de servicio:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Error creando reserva de servicio");
  }

  return data[0].id as string;
}
