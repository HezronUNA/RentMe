import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHeroItems } from "../../../shared/api/getHero";
import type { HeroItem } from "../../../slices/home/sections/hero/type";

export const accommodationsHeroKeys = {
  all: ["accommodations", "hero"] as const,
  specific: (documentId: string) => [...accommodationsHeroKeys.all, documentId] as const,
};

export function useAccommodationsHero() {
  const [selectedDocumentId] = useState<string>("6"); // Documento #6 como especificaste

  const query = useQuery<HeroItem[]>({
    queryKey: accommodationsHeroKeys.specific(selectedDocumentId),
    queryFn: getHeroItems,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60,   // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Filtrar para obtener el documento específico (id "6")
  const heroData = query.data?.find(item => item.id === selectedDocumentId) || query.data?.[0];

  return {
    heroData,
    items: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.isError ? "No se pudo cargar el contenido del hero" : null,
    refetch: query.refetch,
    selectedDocumentId,
  };
}