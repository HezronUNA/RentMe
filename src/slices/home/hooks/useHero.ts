// src/slices/hero/hooks/useHero.ts
import { useQuery } from "@tanstack/react-query";
import { getHeroItems } from "../api/getHero";
import type { HeroItem } from "../sections/hero/type";

export const heroKeys = {
  all: ["hero", "items"] as const,
};

export function useHero() {
  const query = useQuery<HeroItem[]>({
    queryKey: heroKeys.all,
    queryFn: getHeroItems,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60,   // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    items: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.isError ? "No se pudo cargar el contenido" : null,
    refetch: query.refetch,
  };
}
