import { supabaseConfig } from "@/api/supabase/config"
import { sanitizeForStorage } from '@/utils/sanitize'
import type {
  CrearReservaHospedaje,
  ReservaHospedajeInsert,
} from "../model/accomodationType"

type ReservaHospedajeInput = ReservaHospedajeInsert | CrearReservaHospedaje

function toDateString(value: string | Date) {
  return typeof value === "string" ? value : value.toISOString().split("T")[0]
}

function normalizeReservaData(reservaData: ReservaHospedajeInput): ReservaHospedajeInsert {
  if ("nombre_cliente" in reservaData) {
    return {
      ...reservaData,
      estado: reservaData.estado ?? "pendiente",
    }
  }

  return {
    hospedaje_id: reservaData.hospedajeId,
    nombre_cliente: reservaData.nombre,
    telefono: reservaData.telefono,
    correo: reservaData.email,
    cantidad_huespedes: reservaData.numeroHuespedes,
    fecha_inicio: toDateString(reservaData.fechaCheckIn),
    fecha_fin: toDateString(reservaData.fechaCheckOut),
    estado: "pendiente",
  }
}

// Crear una nueva reserva de hospedaje en Supabase
export async function crearReservaHospedaje(
  reservaData: ReservaHospedajeInput
): Promise<string> {
  const payload = normalizeReservaData(reservaData)

  // Sanitize text fields
  const nombre_cliente = sanitizeForStorage(payload.nombre_cliente) ?? ''
  const telefono = sanitizeForStorage(payload.telefono) ?? ''
  const correo = sanitizeForStorage(payload.correo) ?? null

  const rpcUrl = `${supabaseConfig.url}/rest/v1/rpc/insert_reserva_hospedaje_safe`

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_hospedaje_id: payload.hospedaje_id,
      p_nombre_cliente: nombre_cliente,
      p_telefono: telefono,
      p_correo: correo,
      p_cantidad_huespedes: payload.cantidad_huespedes,
      p_fecha_inicio: payload.fecha_inicio,
      p_fecha_fin: payload.fecha_fin,
      p_fuente: 'web',
      p_referencia_externa: null,
      p_ip: null,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Error creando reserva de hospedaje (RPC):', errorText)
    throw new Error(errorText || 'Error creando reserva de hospedaje')
  }

  try {
    const result = await response.json()
    if (typeof result === 'string') return result
    if (result && typeof result === 'object') {
      const first = Object.values(result)[0]
      if (typeof first === 'string') return first
    }
  } catch {
    // ignore
  }

  return crypto.randomUUID()
}

