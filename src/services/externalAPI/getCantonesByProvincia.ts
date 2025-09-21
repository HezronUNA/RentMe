import type { Canton } from "@/shared/types/places";

const URL_API_PLACES = import.meta.env.VITE_URL_API_PLACES || 'https://api-geo-cr.vercel.app';

export const getCantonesByProvincia = async (provinciaId: number): Promise<Canton[]> => {
  try {
    const response = await fetch(`${URL_API_PLACES}/provincias/${provinciaId}/cantones`);
    if (!response.ok) {
      throw new Error(`Error al obtener cantones: ${response.status}`);
    }
    const data = await response.json();
    
    // Si la respuesta es un array directamente
    if (Array.isArray(data)) {
      return data;
    }
    
    // Si la respuesta es un objeto que contiene un array
    if (data && typeof data === 'object') {
      const possibleArrays = Object.values(data).filter(Array.isArray);
      if (possibleArrays.length > 0) {
        return possibleArrays[0] as Canton[];
      }
    }
    
    throw new Error('Formato de respuesta inesperado para cantones');
  } catch (error) {
    throw error;
  }
};