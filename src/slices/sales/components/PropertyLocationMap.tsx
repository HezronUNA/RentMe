import React from 'react';
import { H4, P } from '@/components/ui/Typography';

interface PropertyLocationMapProps {
  googleMapsUrl?: string | null;
}

// Componente del título reutilizable
const MapTitle: React.FC = () => (
  <div className="w-full px-3.5 py-[5px] bg-[#52655B] rounded-md flex justify-center items-center gap-2.5 mb-6">
    <P className="flex-1 text-center text-white text-xl font-semibold font-title tracking-widest uppercase pb-0 scroll-m-0">
      Ubicación de la propiedad
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
          Los datos de coordenadas no están disponibles para esta propiedad.
        </P>
      </div>
    </div>
  </div>
);

const buildEmbedUrl = (url?: string | null): string | null => {
  if (!url) return null;

  const trimmedUrl = url.trim();
  if (!trimmedUrl) return null;

  if (trimmedUrl.includes('output=embed') || trimmedUrl.includes('/maps/embed')) {
    return trimmedUrl;
  }

  const coordinateMatch = trimmedUrl.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);

  if (coordinateMatch) {
    return `https://www.google.com/maps?q=${coordinateMatch[1]},${coordinateMatch[2]}&z=15&output=embed`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(trimmedUrl)}&output=embed`;
};

export const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({ googleMapsUrl }) => {
  const embedUrl = buildEmbedUrl(googleMapsUrl);

  if (!embedUrl) {
    return (
      <div>
        <MapTitle />
        <UnavailableLocationMessage />
      </div>
    );
  }

  return (
    <div>
      <MapTitle />
      <div className="w-full overflow-hidden rounded-2xl border border-[#d9dfd8] bg-gray-100 shadow-sm aspect-[16/10] min-h-[320px] md:min-h-[420px] lg:min-h-[500px]">
        <iframe
          title="Ubicación de la propiedad"
          src={embedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PropertyLocationMap;

