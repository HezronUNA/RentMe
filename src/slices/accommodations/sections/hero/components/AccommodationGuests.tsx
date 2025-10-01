interface AccommodationGuestsProps {
  variant: 'desktop' | 'mobile';
  huespedes: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function AccommodationGuests({ 
  variant, 
  huespedes, 
  onDecrease, 
  onIncrease 
}: AccommodationGuestsProps) {
  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200 mx-2">
        <div className="w-full px-6 py-5 flex flex-col justify-center gap-3">
          <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
            Huéspedes
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onDecrease}
              disabled={huespedes === 0}
              className="w-10 h-10 rounded-full border-2 border-[#52655B] bg-white text-[#52655B] flex items-center justify-center hover:bg-[#52655B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#52655B] transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-black text-xl font-semibold min-w-[40px] text-center">
              {huespedes}
            </span>
            <button
              onClick={onIncrease}
              className="w-10 h-10 rounded-full border-2 border-[#52655B] bg-white text-[#52655B] flex items-center justify-center hover:bg-[#52655B] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2">
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Huéspedes
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-black text-sm font-medium">Número de huéspedes</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onDecrease}
            disabled={huespedes === 0}
            className="w-8 h-8 rounded-full border-2 border-[#52655B] bg-white text-[#52655B] flex items-center justify-center hover:bg-[#52655B] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#52655B] transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="text-black text-base font-semibold min-w-[30px] text-center">
            {huespedes}
          </span>
          <button
            onClick={onIncrease}
            className="w-8 h-8 rounded-full border-2 border-[#52655B] bg-white text-[#52655B] flex items-center justify-center hover:bg-[#52655B] hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}