import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabase/client';

export interface SalesLocation {
  id: string;
  descripcion: string;
}

/**
 * Obtiene ubicaciones unicas desde propiedades en venta activas.
 * Se normaliza el texto tomando la primera parte antes de coma.
 */
export function useSalesLocations() {
  const [data, setData] = useState<SalesLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSalesLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: propiedades, error: dbError } = await supabase
          .from('propiedades_venta')
          .select('ubicacion')
          .eq('activo', true)
          .eq('estado', 'disponible')
          .not('ubicacion', 'is', null);

        if (dbError) throw dbError;

        const normalizeLocationLabel = (value: string) => value.split(',')[0].trim();

        const uniqueLocations = Array.from(
          new Map(
            (propiedades || [])
              .filter((p) => p.ubicacion && typeof p.ubicacion === 'string')
              .map((p) => {
                const normalized = normalizeLocationLabel(p.ubicacion.trim());
                return [
                  normalized.toLowerCase(),
                  {
                    id: normalized,
                    descripcion: normalized,
                  },
                ];
              }),
          ).values(),
        ).sort((a, b) => a.descripcion.localeCompare(b.descripcion));

        setData(uniqueLocations);
      } catch (err) {
        console.error('Error fetching sales locations:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesLocations();
  }, []);

  return { data, isLoading, error };
}
