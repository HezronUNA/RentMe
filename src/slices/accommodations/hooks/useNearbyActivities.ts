import { useState, useEffect } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore';
import type { ActividadCercana } from '../type';
import { db } from '@/services/firebase';

export const useNearbyActivities = (hospedajeId: string) => {
  const [actividades, setActividades] = useState<ActividadCercana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividadesCercanas = async () => {
      if (!hospedajeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Referencia al documento del hospedaje
        const hospedajeDocRef = doc(db, 'hospedaje', hospedajeId);
        
        // Referencia a la subcolección de actividades cercanas
        const actividadesCollectionRef = collection(hospedajeDocRef, 'actividadesCercanas');
        
        // Obtener todos los documentos de la subcolección
        const actividadesSnapshot = await getDocs(actividadesCollectionRef);
        
        const actividadesList: ActividadCercana[] = [];
        
        actividadesSnapshot.forEach((doc) => {
          const data = doc.data();
          actividadesList.push({
            id: doc.id,
            nombre: data.nombre || '',
            descripcion: data.descripcion || '',
            distanciaKm: data.distanciaKm || 0,
            imagenes: data.imagenes || [],
            ...data // Incluir cualquier campo adicional
          });
        });

        // Ordenar por distancia (más cercanas primero)
        actividadesList.sort((a, b) => a.distanciaKm - b.distanciaKm);
        
        setActividades(actividadesList);
      } catch (err) {
        console.error('Error al obtener actividades cercanas:', err);
        setError('Error al cargar las actividades cercanas');
      } finally {
        setLoading(false);
      }
    };

    fetchActividadesCercanas();
  }, [hospedajeId]);

  return { actividades, loading, error };
};