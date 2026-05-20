import type { CrearReservaVenta } from "../type"
import { supabaseConfig } from "@/api/supabase/config"
import { sanitizeForStorage } from '@/utils/sanitize'

export interface ReservaVentaCreada {
  id: string
  codigo: string
}

/**
 * Crear una nueva reserva de venta (usa REST fetch igual que hospedajes)
 */
export async function crearReservaVenta(data: CrearReservaVenta): Promise<ReservaVentaCreada> {
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
      // CORRECCIÓN: Usamos propiedad_id con guion bajo según la interfaz
      p_propiedad_venta_id: data.propiedad_id, 
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

  try {
    const result = await response.json()
    if (typeof result === 'string') {
      return {
        id: result,
        codigo: '',
      }
    }
    if (result && typeof result === 'object') {
      const maybeId = typeof result.id === 'string' ? result.id : null
      const maybeCodigo = typeof result.codigo === 'string' ? result.codigo : null

      if (maybeId) {
        return {
          id: maybeId,
          codigo: maybeCodigo ?? '',
        }
      }

      const first = Object.values(result)[0]
      if (typeof first === 'string') {
        return {
          id: first,
          codigo: '',
        }
      }
    }
  } catch (e) {
    // ignore parse error
  }

  return {
    id: crypto.randomUUID(),
    codigo: '',
  }
}