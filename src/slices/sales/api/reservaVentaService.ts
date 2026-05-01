import type { CrearReservaVenta } from "../type"
import { supabaseConfig } from "@/api/supabase/config"

/**
 * Crear una nueva reserva de venta (usa REST fetch igual que hospedajes)
 */
export async function crearReservaVenta(data: CrearReservaVenta): Promise<string> {
  const id = crypto.randomUUID()

  const payload = {
    id,
    propiedad_venta_id: data.propiedadId,
    cliente_nombre: data.nombre,
    cliente_email: data.email,
    cliente_telefono: data.telefono,
    mensaje: data.mensaje ?? null,
    estado: "interesado",
  }

  const response = await fetch(`${supabaseConfig.url}/rest/v1/reservas_propiedad_venta`, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error("Error creando reserva de venta:", text)
    throw new Error(text || "Error al crear la reserva de venta")
  }

  return id
}

