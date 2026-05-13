import { H2, H3, P } from '@/components/ui/Typography';

interface AccommodationLocationMapProps {
  googleMapsUrl?: string | null;
}

const MapTitle = () => (
  <div className="w-full rounded-md flex justify-center items-center mb-10">
    <H2 className='text-3xl sm:text-4xl'>
      Ubicación del hospedaje
    </H2>
  </div>
);

const UnavailableLocationMessage = () => (
  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-6 max-w-md mx-auto">
    <div className="flex items-start space-x-3">
      <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div>
        <H3 className="font-medium text-amber-800 mb-2 text-lg">Ubicación no disponible</H3>
        <P className="text-amber-700 text-sm mt-0">
          Este hospedaje todavía no tiene un enlace de Google Maps configurado.
        </P>
      </div>
    </div>
  </div>
);

export const AccommodationLocationMap = ({ googleMapsUrl }: AccommodationLocationMapProps) => {
  const embedUrl = googleMapsUrl?.trim();

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
      <div className="w-full h-[500px] rounded-lg overflow-hidden border shadow-sm bg-gray-100">
        <iframe
          title="Ubicación del hospedaje"
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

export default AccommodationLocationMap;
