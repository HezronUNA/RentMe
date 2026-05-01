import { supabase } from "@/api/supabase/client";

export interface CreateReservaServicioInput {
  nombre: string;
  correo: string;
  telefono: string;
  servicio: string;
  mensaje?: string;
}

export async function createReservaServicio(input: CreateReservaServicioInput) {
  const { error } = await supabase.from("reservas_servicios").insert({
    nombre_cliente: input.nombre,
    correo_electronico: input.correo,
    telefono: input.telefono,
    servicio_interes: input.servicio,
    notas: input.mensaje || null,
  });

  if (error) {
    throw error;
  }
}
