// src/features/reviews/services/review.api.ts
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import type { Review } from "../sections/reviews/type";


export async function getReviews(): Promise<Review[]> {
  const db = getFirestore();

  // Referencia a la colección "review"
  const reviewsRef = collection(db, "review");

  // Query para traer solo las aprobadas
  const q = query(reviewsRef, where("estado", "==", "aprobado"));

  // Ejecutar query
  const snapshot = await getDocs(q);

  // Mapear a nuestro type
  const reviews: Review[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      calificacion: data.calificacion,
      correo: data.correo,
      estado: data.estado,
      fecha: data.fecha.toDate(), // Firestore guarda Timestamp, lo convertimos a Date
      hospedajeId: data.hospedajeId ?? null,
      mensaje: data.mensaje,
      nombreHuesped: data.nombreHuesped,
    };
  });

  return reviews;
}
