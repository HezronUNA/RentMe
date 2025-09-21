import type { PropiedadVenta } from "../type";
import { getPropiedadesByEstado } from "./getPropertiesByState";

export async function getPropiedadesDisponibles(): Promise<PropiedadVenta[]> {
  return getPropiedadesByEstado("Disponible")
}