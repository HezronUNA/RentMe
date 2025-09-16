// src/slices/services/hooks/useServiceTitle.ts
import { useEffect, useState } from "react";
import { getTitles } from "../../../shared/api/getTitles";
import type { titles } from "../../../shared/types/titles";

// El getTitles ya devuelve objetos con id
export type ServiceTitle = titles & { id: string };

export function useServiceTitle() {
  const [title, setTitle] = useState<ServiceTitle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchServiceTitle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const titles = await getTitles();
        
        if (mounted) {
          // Buscamos específicamente el título con id 6
          // getTitles ya devuelve objetos con id, necesitamos hacer type assertion
          const titlesWithId = titles as ServiceTitle[];
          const serviceTitle = titlesWithId.find(title => title.id === '6');
          setTitle(serviceTitle || null);
          
          if (!serviceTitle) {
            setError('No se encontró el título para servicios (id: 6)');
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          console.error('Error fetching service title:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchServiceTitle();

    return () => {
      mounted = false;
    };
  }, []);

  const retry = () => {
    setError(null);
    setLoading(true);
  };

  return {
    title,
    loading,
    error,
    retry,
    hasTitle: !!title,
  };
}