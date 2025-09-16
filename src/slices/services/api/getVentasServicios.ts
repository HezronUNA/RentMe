import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { VentaServicio } from "../sections/salesService/type";

export async function getVentasServicios(): Promise<VentaServicio[]> {
  try {
    const colRef = collection(db, "ventasServicios");
    const snapshot = await getDocs(colRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as VentaServicio),
    }));
  } catch (error) {
    throw error;
  }
}
