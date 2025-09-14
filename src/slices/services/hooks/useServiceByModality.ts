import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export function useServiciosByModalidad(modalidadId: string) {
  return useQuery({
    queryKey: ["servicios-modalidad", modalidadId],
    queryFn: async () => {
      if (!modalidadId) return [];
      const modalidadRef = doc(db, "modalidadServicio", modalidadId);
      const modalidadSnap = await getDoc(modalidadRef);
      if (!modalidadSnap.exists()) return [];
      const modalidadData = modalidadSnap.data();
      const refs = [
        ...(modalidadData.serviciosIncluidos || []),
        ...(modalidadData.serviciosAdicionales || []),
      ];
      // Si los servicios son referencias, obtén los datos de cada uno
      const servicios = await Promise.all(
        refs.map(async (ref: any) => {
          let servicioId = typeof ref === "string"
            ? ref.split("/").pop()
            : ref.id;
          if (!servicioId) return null;
          const servicioRef = doc(db, "servicios", servicioId);
          const servicioSnap = await getDoc(servicioRef);
          if (!servicioSnap.exists()) return null;
          return { id: servicioId, ...servicioSnap.data() };
        })
      );
      return servicios.filter(Boolean);
    },
    enabled: !!modalidadId,
    staleTime: 1000 * 60 * 5
  });
}