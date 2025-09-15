import { db } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";
import type { ReservaServicio } from "../sections/serviceDetail/type";

export async function postReservaServicio(data: ReservaServicio) {
  try {
    const docRef = await addDoc(collection(db, "reservaServicio"), data);
    return docRef.id;
  } catch (error) {
    throw error;
  }
}