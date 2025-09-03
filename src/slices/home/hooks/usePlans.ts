// src/hooks/usePlans.ts
import { useQuery } from "@tanstack/react-query"
import type { PlansType } from "../sections/services/components/PlansType"
import { getPlanesGestion } from "../api/getPlans"

export const planesKeys = {
  all: ["PlanesGestion"] as const,
}

export function usePlans() {
  const query = useQuery<PlansType[]>({
    queryKey: planesKeys.all,
    queryFn: getPlanesGestion,
    staleTime: 1000 * 60 * 5, // 5 minutos "frescos"
    gcTime: 1000 * 60 * 60,   // 1 hora antes de limpiar el cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    PlanesGestion: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.error,
    reload: query.refetch,
  }
}

export default usePlans