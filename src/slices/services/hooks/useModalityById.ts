import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export function useModalityById(modalidadId: string) {
 
  return useQuery({
    queryKey: ["modalidad-service", modalidadId],
    queryFn: async () => {
      console.log("Buscando modalidad con ID:", modalidadId); // <-- Depuración
      if (!modalidadId) return null;
      const modalidadRef = doc(db, "modalidadServicio", modalidadId);
      const modalidadSnap = await getDoc(modalidadRef);
      if (!modalidadSnap.exists()) {
        console.log("No existe el documento modalidadServicio con ese ID");
        return null;
      }
      console.log("modalidadSnap.exists():", modalidadSnap.exists());
console.log("modalidadSnap.data():", modalidadSnap.data());
      return { id: modalidadId, ...modalidadSnap.data() };
    },
    enabled: !!modalidadId,
    staleTime: 1000 * 60 * 5,
  });
}