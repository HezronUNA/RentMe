import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOurTeam,
  getOurTeamRealtime,
} from "@/slices/aboutUs/api/getOurTeam";
import type { MiembroEquipo } from "../sections/ourTeam/type";

export const ourTeamKey = ["ourTeam"];

export function useOurTeam() {
  const queryClient = useQueryClient();
  const unsubRef = useRef<(() => void) | undefined>(undefined);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleMember = (id: string) => {
    setActiveId(current => current === id ? null : id);
  };

  const query = useQuery<MiembroEquipo[]>({
    queryKey: ourTeamKey,
    queryFn: async () => {
      const data = await getOurTeam();
      // Ordenar alfabéticamente por nombre
      return data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    unsubRef.current = getOurTeamRealtime((nuevoEquipo) => {
      queryClient.setQueryData(ourTeamKey, nuevoEquipo);
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
    activeId,
    toggleMember,
  };
}
