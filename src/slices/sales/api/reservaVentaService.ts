import type { CrearReservaVenta } from "../type"
import { supabaseConfig } from "@/api/supabase/config"
import { sanitizeForStorage } from '@/utils/sanitize'

/**
 * Crear una nueva reserva de venta (usa REST fetch igual que hospedajes)
 */
export async function crearReservaVenta(data: CrearReservaVenta): Promise<string> {
  // Sanitize inputs
  const clienteNombre = sanitizeForStorage(data.nombre) ?? ''
  const clienteEmail = sanitizeForStorage(data.email) ?? null
  const clienteTelefono = sanitizeForStorage(data.telefono) ?? ''
  const mensaje = sanitizeForStorage(data.mensaje) ?? null

  // Call Supabase RPC that enforces rate-limit and inserts safely
  const rpcUrl = `${supabaseConfig.url}/rest/v1/rpc/insert_reserva_propiedad_venta_safe`

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_propiedad_venta_id: data.propiedadId,
      p_cliente_nombre: clienteNombre,
      p_cliente_email: clienteEmail,
      p_cliente_telefono: clienteTelefono,
      p_mensaje: mensaje,
      p_ip: null,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('Error creando reserva de venta (RPC):', text)
    throw new Error(text || 'Error al crear la reserva de venta')
  }

  // RPC returns scalar uuid in body; try to parse
  try {
    const result = await response.json()
    // If result is { insert_reserva_propiedad_venta_safe: "uuid" } or just uuid
    if (typeof result === 'string') return result
    if (result && typeof result === 'object') {
      const first = Object.values(result)[0]
      if (typeof first === 'string') return first
    }
  } catch (e) {
    // ignore parse error
  }

  // Fallback: generate id locally (shouldn't usually happen)
  return crypto.randomUUID()
}

