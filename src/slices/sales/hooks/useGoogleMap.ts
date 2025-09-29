import { useEffect, useRef, useState } from 'react';

interface UseGoogleMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

interface UseGoogleMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  isValidCoordinates: boolean;
  coordinates: { lat: number; lng: number } | null;
  apiKey: string;
}

export const useGoogleMap = ({ lat, lng, zoom = 16 }: UseGoogleMapProps): UseGoogleMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  
  // API Key de Google Maps
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Validar coordenadas
  const isValidCoordinates = !!(lat && lng && 
    typeof lat === 'number' && typeof lng === 'number' && 
    !isNaN(lat) && !isNaN(lng));
  
  // Coordenadas procesadas
  const coordinates = isValidCoordinates ? { lat: lat!, lng: lng! } : null;
  
  // Inicializar mapa
  useEffect(() => {
    if (mapRef.current && !map && coordinates) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "on" }]
          }
        ],
        gestureHandling: 'cooperative',
        mapTypeId: 'roadmap'
      });
      setMap(mapInstance);
    }
  }, [mapRef, map, coordinates, zoom]);
  
  // Agregar marcador
  useEffect(() => {
    if (map && coordinates) {
      new window.google.maps.Marker({
        position: coordinates,
        map,
        title: "Ubicación de la Propiedad"
      });
    }
  }, [map, coordinates]);
  
  return {
    mapRef,
    isValidCoordinates,
    coordinates,
    apiKey
  };
};