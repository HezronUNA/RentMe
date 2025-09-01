// src/slices/aboutUs/hooks/useBanner.ts
import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBannerById,
  subscribeBannerById,
} from "@/slices/aboutUs/api/getBanner";
import type { Banner } from "../sections/banner/type";

export const bannerKeys = {
  byId: (id: string) => ["banner", id] as const,
};

export function useBanner(id: string) {
  const queryClient = useQueryClient();
  const unsubRef = useRef<(() => void) | undefined>(undefined);

  const query = useQuery<Banner | null>({
    queryKey: bannerKeys.byId(id),
    queryFn: () => fetchBannerById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    unsubRef.current = subscribeBannerById(id, (nuevoBanner) => {
      queryClient.setQueryData(bannerKeys.byId(id), nuevoBanner);
    });

    return () => {
      unsubRef.current?.();
    };
  }, [queryClient, id]);

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
    data: query.data,
    isLoading: query.isLoading && !query.data,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    scrollToNextSection
  };
}