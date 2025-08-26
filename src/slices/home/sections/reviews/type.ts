// src/features/reviews/models/review.ts

export interface Review {
  id: string;
  calificacion: number;
  correo: string;
  estado: string;
  fecha: Date;
  hospedajeId?: string | null;
  mensaje: string;
  nombreHuesped: string;
}
