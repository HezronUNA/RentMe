import { useState, useEffect } from 'react';
import { supabase } from '@/api/supabase/client';

export interface Location {
  id: string;
  descripcion: string;
}

/**
 * Hook que obtiene las ubicaciones únicas de los hospedajes desde Supabase
 * Sin consumir la API externa de cantones
 */
export function useHospedajeLocations() {
  const [data, setData] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Traer todos los hospedajes con ubicación
        const { data: hospedajes, error: dbError } = await supabase
          .from('hospedajes')
          .select('ubicacion')
          .eq('activo', true)
          .not('ubicacion', 'is', null);

        if (dbError) throw dbError;

        const normalizeLocationLabel = (value: string) => value.split(',')[0].trim();

        // Extraer ubicaciones únicas usando solo la parte antes de la coma
        const uniqueLocations = Array.from(
          new Map(
            (hospedajes || [])
              .filter((h) => h.ubicacion && typeof h.ubicacion === 'string')
              .map((h) => [
                normalizeLocationLabel(h.ubicacion.trim()).toLowerCase(),
                {
                  id: normalizeLocationLabel(h.ubicacion.trim()),
                  descripcion: normalizeLocationLabel(h.ubicacion.trim()),
                },
              ])
          ).values()
        ).sort((a, b) => a.descripcion.localeCompare(b.descripcion));

        setData(uniqueLocations);
      } catch (err) {
        console.error('Error fetching hospedaje locations:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { data, isLoading, error };
}
