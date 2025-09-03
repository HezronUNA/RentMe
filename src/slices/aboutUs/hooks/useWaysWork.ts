// src/slices/aboutUs/hooks/useModalidades.ts
import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchModalidades,
  subscribeModalidades,
} from "../api/getWaysWork";
import type { WaysWork } from "../sections/waysWork/type";

export const modalidadesKeys = {
  all: ["modalidades"] as const,
};

export function useModalidades() {
  const queryClient = useQueryClient();
  const unsubRef = useRef<(() => void) | undefined>(undefined);

  const query = useQuery<WaysWork[]>({
    queryKey: modalidadesKeys.all,
    queryFn: fetchModalidades,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    unsubRef.current = subscribeModalidades((nuevasModalidades: unknown) => {
      queryClient.setQueryData(modalidadesKeys.all, nuevasModalidades);
    });

    return () => {
      unsubRef.current?.();
    };
  }, [queryClient]);

  return {
    data: query.data ?? [],
    isLoading: query.isLoading && !query.data,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}