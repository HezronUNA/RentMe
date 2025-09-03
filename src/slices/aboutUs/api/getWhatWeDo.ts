import {
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { AboutSection } from "../sections/whatWeDo/type";


// 📌 Colección única (Firestore guarda `titulo` y `subtitulo`)
const aboutCol = collection(db, "quienesSomos") as CollectionReference<{
  titulo: string;
  subtitulo: string;
}>;

// ✅ Get all documents once
export async function getWhatWeDo(): Promise<AboutSection[]> {
  const snap = await getDocs(aboutCol);

  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.titulo,
      subtitle: data.subtitulo,
    };
  });
}

// ✅ Realtime subscription
export function getWhatWeDoRealtime(
  onData: (sections: AboutSection[]) => void,
  onError?: (e: unknown) => void
) {
  return onSnapshot(
    aboutCol,
    (snap) => {
      const data = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.titulo,
          subtitle: d.subtitulo,
        };
      });
      onData(data);
    },
    onError
  );
}
