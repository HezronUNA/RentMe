interface AccommodationSearchButtonProps {
  variant: 'desktop' | 'mobile';
  onClick: () => void;
}

export function AccommodationSearchButton({ variant, onClick }: AccommodationSearchButtonProps) {
  if (variant === 'desktop') {
    return (
      <div className="px-2 flex items-center">
        <button 
          onClick={onClick}
          className="h-12 px-6 flex items-center justify-center gap-2 bg-[#52655B] hover:bg-[#4B5B4D] transition-colors rounded-full cursor-pointer text-white font-semibold text-sm shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={onClick}
      className="h-11 px-4 flex items-center justify-center gap-2 bg-[#52655B] hover:bg-[#4B5B4D] transition-colors rounded-full shadow-sm cursor-pointer text-white font-semibold text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      Buscar
    </button>
  );
}

