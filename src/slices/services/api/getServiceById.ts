import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { Servicio } from "./getServicios";

export async function getServicioById(id: string): Promise<Servicio | null> {
  const docRef = doc(db, "servicios", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Servicio;
  }
  
  return null;
}