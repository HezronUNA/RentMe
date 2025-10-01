import { useEffect, useRef, useState } from 'react';
import type { UbicacionExacta, FirebaseGeoPoint } from '../type';
import { geoPointToUbicacion } from '../type';

interface UseGoogleMapProps {
  ubicacionExacta?: UbicacionExacta | FirebaseGeoPoint | any;
  zoom?: number;
}

interface UseGoogleMapReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  isValidCoordinates: boolean;
  coordinates: UbicacionExacta | null;
  apiKey: string;
}

export const useGoogleMap = ({ ubicacionExacta, zoom = 16 }: UseGoogleMapProps): UseGoogleMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  
  // API Key de Google Maps
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Convertir GeoPoint a UbicacionExacta
  const coordinates = geoPointToUbicacion(ubicacionExacta);
  
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