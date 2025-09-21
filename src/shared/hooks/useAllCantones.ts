import { getAllCantonesSimple } from "@/services/externalAPI/getAllCantonesSimple";
import { useQuery } from "@tanstack/react-query";

export const costaRicaQueryKeys = {
  all: ['costaRica'] as const,
  provincias: () => [...costaRicaQueryKeys.all, 'provincias'] as const,
  cantones: () => [...costaRicaQueryKeys.all, 'cantones'] as const,
  cantonesByProvincia: (provinciaId: number) => 
    [...costaRicaQueryKeys.cantones(), 'provincia', provinciaId] as const,
  distritos: (cantonId: number) => 
    [...costaRicaQueryKeys.all, 'distritos', cantonId] as const,
  search: (query: string) => 
    [...costaRicaQueryKeys.cantones(), 'search', query] as const,
};

export const useAllCantones = () => {
  return useQuery({
    queryKey: costaRicaQueryKeys.cantones(),
    queryFn: getAllCantonesSimple,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    select: (data) => {
      if (!Array.isArray(data)) {
        console.warn('Los datos de cantones no son un array:', data);
        return [];
      }
      // Ordenar alfabéticamente usando descripcion
      return data
        .filter(canton => canton && canton.descripcion) // Filtrar cantones válidos
        .sort((a, b) => {
          const descripcionA = a.descripcion || '';
          const descripcionB = b.descripcion || '';
          return descripcionA.localeCompare(descripcionB);
        });
    },
    throwOnError: false,
  });
};