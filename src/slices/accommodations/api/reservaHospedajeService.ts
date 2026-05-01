import { supabaseConfig } from "@/api/supabase/config"
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
  const id = crypto.randomUUID()

  const response = await fetch(`${supabaseConfig.url}/rest/v1/reservas_hospedaje`, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id,
      ...payload,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Error creando reserva de hospedaje:", errorText)
    throw new Error(errorText || "Error creando reserva de hospedaje")
  }

  return id
}

