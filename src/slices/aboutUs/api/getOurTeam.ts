// src/features/ourTeam/service.ts
import {
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { MiembroEquipo } from "../sections/ourTeam/type";


// 📌 Colección con campos en español
const equipoCol = collection(db, "nuestroEquipo") as CollectionReference<{
  nombre: string;
  rol: string;
  fotoURL: string;
  descripcion: string;
}>;

// ✅ Obtener todos una vez
export async function getOurTeam(): Promise<MiembroEquipo[]> {
  const snap = await getDocs(equipoCol);
  return snap.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      nombre: d.nombre,
      rol: d.rol,
      fotoURL: d.fotoURL,
      descripcion: d.descripcion
    };
  });
}

// ✅ Suscripción en tiempo real
export function getOurTeamRealtime(
  onData: (members: MiembroEquipo[]) => void,
  onError?: (e: unknown) => void
) {
  return onSnapshot(
    equipoCol,
    (snap) => {
      const data = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          nombre: d.nombre,
          rol: d.rol,
          fotoURL: d.fotoURL,
          descripcion: d.descripcion
        };
      });
      onData(data);
    },
    onError
  );
}
