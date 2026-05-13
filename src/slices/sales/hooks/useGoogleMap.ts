
import { useRef } from 'react';
import type { UbicacionExacta } from '../type';

interface UseGoogleMapProps {
  ubicacionExacta?: UbicacionExacta;
  zoom?: number;
}

interface UseGoogleMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  isValidUrl: boolean;
  url: UbicacionExacta;
  apiKey: string;
}

export const useGoogleMap = ({ ubicacionExacta }: UseGoogleMapProps): UseGoogleMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // API Key de Google Maps
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Validar URL
  const isValidUrl = !!(ubicacionExacta && ubicacionExacta.trim().length > 0 && 
    (ubicacionExacta.includes('http://') || ubicacionExacta.includes('https://')));
  
  return {
    mapRef,
    isValidUrl,
    url: ubicacionExacta || null,
    apiKey
  };
};

