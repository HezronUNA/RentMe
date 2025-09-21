import type { Provincia } from "@/shared/types/places";

const URL_API_PLACES = import.meta.env.URL_API_PLACES;

export const getProvincias = async (): Promise<Provincia[]> => {
  try {
    const response = await fetch(`${URL_API_PLACES}/provincias`);
    if (!response.ok) {
      throw new Error(`Error al obtener provincias: ${response.status}`);
    }
    const data = await response.json();
    
    // Si es un array directamente
    if (Array.isArray(data)) {
      return data;
    }
    
    // Si tiene estructura de paginación
    if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // Si la API devuelve un objeto con una propiedad que contiene el array
    if (data && typeof data === 'object') {
      const possibleArrays = Object.values(data).filter(Array.isArray);
      if (possibleArrays.length > 0) {
        return possibleArrays[0] as Provincia[];
      }
    }
    
    throw new Error('Formato de respuesta inesperado para provincias');
  } catch (error) {
    throw error;
  }
};