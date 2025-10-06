import { useEffect, useRef, useState } from 'react';
import type { UbicacionHospedaje } from '../type';

interface UseAccommodationMapProps {
  ubicacion?: UbicacionHospedaje;
  zoom?: number;
}

interface UseAccommodationMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  isValidCoordinates: boolean;
  coordinates: { lat: number; lng: number } | null;
  apiKey: string;
}

export const useAccommodationMap = ({ ubicacion, zoom = 16 }: UseAccommodationMapProps): UseAccommodationMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  
  // API Key de Google Maps
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Obtener coordenadas de la ubicación del hospedaje
  const coordinates = ubicacion ? { lat: ubicacion.lat, lng: ubicacion.lng } : null;
  
  // Validar coordenadas
  const isValidCoordinates = !!(coordinates?.lat && coordinates?.lng && 
    typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number' && 
    !isNaN(coordinates.lat) && !isNaN(coordinates.lng));
  
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
        title: "Ubicación del Hospedaje"
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