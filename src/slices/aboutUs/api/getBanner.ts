// src/slices/aboutUs/api/getBanner.ts
import {
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Banner } from "../sections/banner/type";

// Referencia a la colección
const bannersCol = collection(db, "banner") as CollectionReference<Banner>;

// ✅ Trae el banner específico por ID (el banner de "sobre nosotros" sería el ID "1")
export async function fetchBannerById(id: string): Promise<Banner | null> {
  const q = query(bannersCol, where("__name__", "==", id));
  const snap = await getDocs(q);
  const docSnap = snap.docs[0];

  if (!docSnap) return null;

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Banner, "id">),
  };
}

// ✅ Escucha tiempo real sobre un banner específico
export function subscribeBannerById(
  id: string,
  onData: (banner: Banner | null) => void,
  onError?: (e: unknown) => void
) {
  const q = query(bannersCol, where("__name__", "==", id));
  
  return onSnapshot(q, (snap) => {
    const docSnap = snap.docs[0];

    if (!docSnap) return onData(null);

    onData({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Banner, "id">),
    });
  }, onError);
}