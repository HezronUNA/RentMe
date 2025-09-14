// src/slices/services/hooks/useModalidades.ts

import { useQuery } from "@tanstack/react-query";
import type { ModalidadConServicios } from "../sections/waysWork/type";
import { getModalidadesConServicios } from "../api/getModalitywithService";

export const modalidadesKeys = {
  all: ["modalidades"] as const,
  conServicios: ["modalidades", "con-servicios"] as const,
};

export function useModalidadesServicio() {
  const query = useQuery<ModalidadConServicios[]>({
    queryKey: modalidadesKeys.conServicios,
    queryFn: getModalidadesConServicios,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60,   // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  return {
    modalidades: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.isError ? "No se pudo cargar las modalidades" : null,
    refetch: query.refetch,
  };
}