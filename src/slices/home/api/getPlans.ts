
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/services/firebase"
import type { PlansType } from "../sections/services/components/PlansType"


export async function getPlanesGestion(): Promise<PlansType[]> {
 
  const q = query(collection(db, "PlanesGestion"))
  const snapshot = await getDocs(q)
  
  console.log("Snapshot size:", snapshot.size)
  console.log("Docs:", snapshot.docs.map(doc => doc.data()))
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PlansType, "id">),
  }))
}

