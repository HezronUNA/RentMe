// src/slices/services/hooks/useSalesServices.ts
import { useEffect, useState } from "react";
import { getVentasServicios } from "../api/getVentasServicios";

export type ServiceItem = {
  id: string;
  icono: string;
  titulo: string;
};

export function useSalesServices() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getVentasServicios();
        
        // Solo actualizamos el estado si el componente sigue montado
        if (mounted) {
          // Aseguramos orden coherente según la imagen
          const order = ["pin", "chat", "user", "camera", "facebook", "calendar"];
          const sortedData = [...data].sort(
            (a, b) => order.indexOf(a.icono) - order.indexOf(b.icono)
          ) as ServiceItem[];
          
          setItems(sortedData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          console.error('Error fetching sales services:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    // Cleanup function para evitar actualizaciones de estado en componentes desmontados
    return () => {
      mounted = false;
    };
  }, []);

  // Dividimos los items en dos grupos para las filas
  const topRowItems = items.slice(0, 3);
  const bottomRowItems = items.slice(3, 6);

  // Función para reintentar en caso de error
  const retry = () => {
    setError(null);
    setLoading(true);
    // El useEffect se ejecutará automáticamente
  };

  return {
    // Estado
    items,
    topRowItems,
    bottomRowItems,
    loading,
    error,
    
    // Acciones
    retry,
    
    // Utilidades
    hasItems: items.length > 0,
    totalItems: items.length,
  };
}