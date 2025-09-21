import type { Canton } from "@/shared/types/places";
import { getProvincias } from "./getProvincias";

// Define la URL base de la API de lugares
const URL_API_PLACES = import.meta.env.NEXT_PUBLIC_URL_API_PLACES;

// Obtener cantones por provincia con paginación
const getCantonesByProvinciaWithPagination = async (provinciaId: number): Promise<Canton[]> => {
  try {
    let allCantones: Canton[] = [];
    let currentPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      const response = await fetch(
        `${URL_API_PLACES}/provincias/${provinciaId}/cantones?limit=100&page=${currentPage}`
      );
      
      if (!response.ok) {
        throw new Error(`Error al obtener cantones: ${response.status}`);
      }
      
      const data = await response.json();
     
      
      let cantones: Canton[] = [];
      
      // Si es un array directamente
      if (Array.isArray(data)) {
        cantones = data;
        hasMorePages = data.length === 100; // Si vienen menos de 100, es la última página
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

// Obtener todos los cantones (todas las provincias)
export const getAllCantones = async (): Promise<Canton[]> => {
  try {
    const provincias = await getProvincias();
    
    if (!Array.isArray(provincias)) {
      throw new Error('Las provincias no tienen el formato esperado');
    }
    
   
    
    const cantonesPromises = provincias.map(provincia => {
      if (!provincia || typeof provincia.id === 'undefined') {
        return Promise.resolve([]);
      }
      return getCantonesByProvinciaWithPagination(provincia.id);
    });
    
    const cantonesArrays = await Promise.all(cantonesPromises);
    const cantones = cantonesArrays.flat();
    return cantones;
  } catch (error) {
    throw error;
  }
};