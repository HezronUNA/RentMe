// src/slices/sections/accomodations/hooks/useHospedajesDestacados.ts
import { useQuery } from "@tanstack/react-query"
import { getAccomodations } from "@/slices/home/api/getAccomodations"
import type { HospedajeDestacado } from "../sections/accomodations"

export const hospedajesKeys = {
  destacados: ["hospedajes", "destacados"] as const,
}

export function useGetAccomodationHighlights() {
  const query = useQuery<HospedajeDestacado[]>({
    queryKey: hospedajesKeys.destacados,
    queryFn: getAccomodations,
    staleTime: 1000 * 60 * 5, // 5 minutos "frescos"
    gcTime: 1000 * 60 * 60,   // 1 hora antes de limpiar el cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    hospedajes: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.error,
    reload: query.refetch,
  }
}

export default useGetAccomodationHighlights
