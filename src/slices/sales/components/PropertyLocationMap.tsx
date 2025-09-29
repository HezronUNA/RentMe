import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useGoogleMap } from '../hooks/useGoogleMap';

interface PropertyLocationMapProps {
  lat?: number;
  lng?: number;
}

// Componente simple del mapa que usa el hook
const SimpleMapComponent: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const { mapRef } = useGoogleMap({ lat, lng, zoom: 16 });
  return <div ref={mapRef} className="w-full h-full" />;
};

// Componente del título reutilizable
const MapTitle: React.FC = () => (
  <div className="w-full px-3.5 py-[5px] bg-zinc-600 rounded-md flex justify-center items-center gap-2.5 mb-6">
    <div className="flex-1 text-center justify-center text-neutral-50 text-xl font-semibold font-['Work_Sans'] tracking-widest">
      Ubicación de la propiedad
    </div>
  </div>
);

// Componente de estado no disponible
const UnavailableLocationMessage: React.FC = () => (
  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 max-w-md mx-auto">
    <div className="flex items-start space-x-3">
      <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div>
        <h4 className="font-medium text-amber-800 mb-2">Ubicación no disponible</h4>
        <p className="text-amber-700 text-sm">
          Los datos de coordenadas no están disponibles para esta propiedad.
        </p>
      </div>
    </div>
  </div>
);

// Componente para mostrar las coordenadas
const CoordinatesDisplay: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => (
  <div className="mt-4 text-center">
    <p className="text-sm text-gray-500">
      <span className="font-medium">Coordenadas:</span> {lat.toFixed(6)}, {lng.toFixed(6)}
    </p>
  </div>
);

// Componente de loading
const MapLoadingComponent: React.FC = () => (
  <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#52655B] mx-auto mb-4"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#52655B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        </div>
      </div>
      <p className="text-gray-700 font-medium">Cargando mapa...</p>
      <p className="text-gray-500 text-sm mt-1">Preparando la ubicación</p>
    </div>
  </div>
);

// Componente de error
const MapErrorComponent: React.FC<{ status: Status }> = ({ status }) => (
  <div className="w-full h-96 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el mapa</h3>
      <p className="text-red-600 mb-4">
        No se pudo cargar Google Maps. Por favor, verifica tu conexión a internet o recarga la página.
      </p>
      <p className="text-red-500 text-sm">Estado: {status}</p>
    </div>
  </div>
);

// Función de render condicional
const render = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.LOADING:
      return <MapLoadingComponent />;
    case Status.FAILURE:
      return <MapErrorComponent status={status} />;
    case Status.SUCCESS:
      return <></>; // El mapa se renderizará normalmente
    default:
      return <MapLoadingComponent />;
  }
};

// Componente principal refactorizado y limpio
export const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({ lat, lng }) => {
  const { isValidCoordinates, coordinates, apiKey } = useGoogleMap({ lat, lng, zoom: 16 });

  // Si no hay coordenadas válidas, mostrar mensaje de error
  if (!isValidCoordinates || !coordinates) {
    return (
      <div>
        <MapTitle />
        <UnavailableLocationMessage />
      </div>
    );
  }

  // Renderizar mapa con coordenadas válidas
  return (
    <div>
      <MapTitle />
      
      {/* Contenedor del mapa */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden border shadow-sm bg-gray-100">
        <Wrapper 
          apiKey={apiKey} 
          render={render}
          libraries={['geometry', 'places']}
        >
          <SimpleMapComponent lat={coordinates.lat} lng={coordinates.lng} />
        </Wrapper>
      </div>
      
      <CoordinatesDisplay lat={coordinates.lat} lng={coordinates.lng} />
    </div>
  );
};

export default PropertyLocationMap;