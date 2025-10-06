import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useAccommodationMap } from '../hooks/useAccommodationMap';
import type { UbicacionHospedaje } from '../type';
import { H3, H4, P } from '@/shared/components/Typography';

interface AccommodationLocationMapProps {
  ubicacion?: UbicacionHospedaje;
}

// Componente simple del mapa que usa el hook
const SimpleMapComponent: React.FC<{ ubicacion: { lat: number; lng: number } }> = ({ ubicacion }) => {
  const { mapRef } = useAccommodationMap({ ubicacion: ubicacion as UbicacionHospedaje, zoom: 16 });
  return <div ref={mapRef} className="w-full h-full" />;
};

// Componente del título reutilizable
const MapTitle: React.FC = () => (
  <div className="w-full px-3.5 py-[5px] bg-[#52655B] rounded-md flex justify-center items-center gap-2.5 mb-6">
    <P className="flex-1 text-center text-white text-xl font-semibold font-title tracking-widest uppercase pb-0 scroll-m-0">
      Ubicación del hospedaje
    </P>
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
        <H4 className="font-medium text-amber-800 mb-2">Ubicación no disponible</H4>
        <P className="text-amber-700 text-sm mt-0">
          Los datos de coordenadas no están disponibles para este hospedaje.
        </P>
      </div>
    </div>
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
      <P className="text-gray-700 font-medium">Cargando mapa...</P>
      <P className="text-gray-500 text-sm mt-1">Preparando la ubicación</P>
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
      <H3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el mapa</H3>
      <P className="text-red-600 mb-4">
        No se pudo cargar Google Maps. Por favor, verifica tu conexión a internet o recarga la página.
      </P>
      <P className="text-red-500 text-sm mt-0">Estado: {status}</P>
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

// Componente principal
export const AccommodationLocationMap: React.FC<AccommodationLocationMapProps> = ({ ubicacion }) => {
  const { isValidCoordinates, coordinates, apiKey } = useAccommodationMap({ ubicacion, zoom: 16 });

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
          <SimpleMapComponent ubicacion={coordinates} />
        </Wrapper>
      </div>
    </div>
  );
};

export default AccommodationLocationMap;