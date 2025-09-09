interface DestinationSectionProps {
  variant: 'desktop' | 'mobile';
}

export function DestinationSection({ variant }: DestinationSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200 mx-2">
        <div className="w-full px-8 py-5 flex flex-col justify-center gap-3">
          <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
            Destino
          </div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="text-black text-base font-medium">
              Busca tu destino
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2">
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Destino
      </div>
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <div className="text-black text-sm font-medium">
          Busca tu destino
        </div>
      </div>
    </div>
  );
}
