import { collection, getDocs } from "firebase/firestore";
import type { Servicio } from "./getServicios";
import { db } from "@/services/firebase";

export async function getServicios(): Promise<Servicio[]> {
  const snapshot = await getDocs(collection(db, "servicios"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Servicio[];
}