import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchObjetivoUnico,
  subscribeObjetivoUnico,
} from "@/slices/aboutUs/api/getObjetive";
import type { Objetivo } from "../sections/ourObjetive/type";

export const objetivoKey = ["objetivo"];

export function useObjetivo() {
  const queryClient = useQueryClient();
  const unsubRef = useRef<(() => void) | undefined>(undefined);

  const query = useQuery<Objetivo | null>({
    queryKey: objetivoKey,
    queryFn: fetchObjetivoUnico,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    unsubRef.current = subscribeObjetivoUnico((nuevoObjetivo) => {
      queryClient.setQueryData(objetivoKey, nuevoObjetivo);
    });

    return () => {
      unsubRef.current?.();
    };
  }, [queryClient]);

  return {
    data: query.data,
    isLoading: query.isLoading && !query.data,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
