import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { ModalidadServicio } from "../sections/waysWork/type";

export async function getModalidadesServicio(): Promise<ModalidadServicio[]> {
  const snapshot = await getDocs(collection(db, "modalidadServicio"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ModalidadServicio[];
}