// src/slices/hero/hooks/useHero.ts
import { useQuery } from "@tanstack/react-query";
import { getHeroItems } from "../api/getHero";
import type { HeroItem } from "../../slices/home/sections/hero/type";

export const heroKeys = {
  all: ["hero", "items"] as const,
};

export function useHero(_id: string) {
  const query = useQuery<HeroItem[]>({
    queryKey: heroKeys.all,
    queryFn: getHeroItems,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60,   // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

    // Función para hacer scroll suave a la siguiente sección
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return {
    items: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.isError ? "No se pudo cargar el contenido" : null,
    refetch: query.refetch,
    scrollToNextSection
  };
}
