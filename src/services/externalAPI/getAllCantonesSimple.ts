import type { Canton } from "@/shared/types/places";

const URL_API_PLACES = import.meta.env.VITE_URL_API_PLACES || 'https://api-geo-cr.vercel.app';

// Obtener todos los cantones directamente con paginación
export const getAllCantonesSimple = async (): Promise<Canton[]> => {
  try {
    let allCantones: Canton[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      const response = await fetch(
        `${URL_API_PLACES}/cantones?limit=100&page=${currentPage}`
      );
      
      if (!response.ok) {
        throw new Error(`Error al obtener cantones: ${response.status}`);
      }
      
      const data = await response.json();
      
      let cantones: Canton[] = [];
      
      // Si es un array directamente
      if (Array.isArray(data)) {
        cantones = data;
        hasMorePages = data.length === 100;
      }
      // Si tiene estructura de paginación
      else if (data && data.data && Array.isArray(data.data)) {
        cantones = data.data;
        hasMorePages = data.pagination ? currentPage < data.pagination.totalPages : false;
      }
      // Si la respuesta es un objeto que contiene un array
      else if (data && typeof data === 'object') {
        const possibleArrays = Object.values(data).filter(Array.isArray);
        if (possibleArrays.length > 0) {
          cantones = possibleArrays[0] as Canton[];
          hasMorePages = cantones.length === 100;
        } else {
          hasMorePages = false;
        }
      } else {
        hasMorePages = false;
      }
      
      allCantones = [...allCantones, ...cantones];
      currentPage++;
      
      // Prevenir bucle infinito
      if (currentPage > 20) {
        break;
      }
    }
    return allCantones;
  } catch (error) {
    throw error;
  }
};