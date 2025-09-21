import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore"
import type { EstadoPropiedad, PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesByEstado(estado: EstadoPropiedad): Promise<PropiedadVenta[]> {
  const q = query(propiedadesVentaCol, where("estado", "==", estado))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))
}