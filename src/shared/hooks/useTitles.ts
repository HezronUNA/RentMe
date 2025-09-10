


import { useQuery } from "@tanstack/react-query";
import { getTitles } from "../api/getTitles.ts";
import type { titles } from "@/shared/types/titles";

export const titlesKeys = {
  all: ["titulos", "items"] as const,
};

export function useTitles(_id: string) {
  const query = useQuery<titles[]>({
    queryKey: titlesKeys.all,
    queryFn: getTitles,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60,   // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  
 
  return {
    items: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.isError ? "No se pudo cargar los títulos" : null,
    refetch: query.refetch
  };
}