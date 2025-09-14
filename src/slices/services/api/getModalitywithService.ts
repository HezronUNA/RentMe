import type { ModalidadConServicios } from "../sections/waysWork/type";
import { getServicios } from "./getService";
import { getModalidadesServicio } from "./getServiceModality";
import type { DocumentReference } from "firebase/firestore";

// Extrae el ID de referencia o retorna el string si no es referencia
function extractIdFromReferenceOrString(ref: DocumentReference | string): string {
  if (typeof ref === "string") {
    // Si es string tipo "/servicios/1", extrae el último segmento
    if (ref.includes("/")) return ref.split("/").pop() || ref;
    return ref;
  }
  if (ref && typeof ref === "object" && "id" in ref) {
    return ref.id;
  }
  return "";
}

// Función para obtener modalidades con sus servicios populados
export async function getModalidadesConServicios(): Promise<ModalidadConServicios[]> {
  try {
    const [modalidades, servicios] = await Promise.all([
      getModalidadesServicio(),
      getServicios()
    ]);

    // Crear un mapa de servicios para búsqueda rápida
    const serviciosMap = new Map(servicios.map(s => [s.id, s]));

    const resultado = modalidades.map((modalidad) => {
      // Extraer IDs correctos de las referencias o strings
      const serviciosAdicionales = (modalidad.serviciosAdicionales || [])
        .map((ref: DocumentReference | string) => extractIdFromReferenceOrString(ref));
      const serviciosIncluidos = (modalidad.serviciosIncluidos || [])
        .map((ref: DocumentReference | string) => extractIdFromReferenceOrString(ref));


const serviciosAdicionalesData = serviciosAdicionales.map((id: string) => {
  const servicio = serviciosMap.get(id);
  return servicio ? servicio : id; // Si no existe en el mapa, retorna el string
});

const serviciosIncluidosData = serviciosIncluidos.map((id: string) => {
  const servicio = serviciosMap.get(id);
  return servicio ? servicio : id; // Si no existe en el mapa, retorna el string
});


      return {
        ...modalidad,
        serviciosAdicionalesData,
        serviciosIncluidosData
      };
    });

    return resultado;

  } catch (error) {
    console.error('❌ Error en getModalidadesConServicios:', error);
    throw error;
  }
}