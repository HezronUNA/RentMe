interface AccommodationGuestsProps {
  variant: 'desktop' | 'mobile';
  cuartos: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function AccommodationGuests({ 
  variant, 
  cuartos, 
  onDecrease, 
  onIncrease 
}: AccommodationGuestsProps) {
  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200">
        <div className="w-full px-6 py-3 flex flex-col justify-center gap-2">
          <div className="text-zinc-700 text-xs font-semibold tracking-wide text-left uppercase">
            Cuartos
          </div>
          
          <div className="flex items-center justify-between rounded-2xl px-2 py-1 hover:bg-zinc-100/80 transition-colors">
            <button
              onClick={onDecrease}
              disabled={cuartos === 0}
              className="w-9 h-9 rounded-full border border-zinc-300 bg-white text-zinc-600 flex items-center justify-center hover:border-zinc-400 hover:text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-black text-base font-semibold min-w-[40px] text-center">
              {cuartos}
            </span>
            <button
              onClick={onIncrease}
              className="w-9 h-9 rounded-full border border-zinc-300 bg-white text-zinc-600 flex items-center justify-center hover:border-zinc-400 hover:text-zinc-800 transition-all duration-200 cursor-pointer"
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
    <div className="px-4 py-4 border-b border-zinc-200/80">
      <div className="text-zinc-700 text-xs font-semibold tracking-wide mb-2 uppercase">
        Cuartos
      </div>
      
      <div className="flex items-center justify-between bg-zinc-50 rounded-2xl border border-zinc-200 px-3 py-3">
        <span className="text-black text-sm font-medium">Número de cuartos</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onDecrease}
            disabled={cuartos === 0}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-zinc-600 flex items-center justify-center hover:border-zinc-400 hover:text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="text-black text-base font-semibold min-w-[30px] text-center">
            {cuartos}
          </span>
          <button
            onClick={onIncrease}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-zinc-600 flex items-center justify-center hover:border-zinc-400 hover:text-zinc-800 transition-all duration-200"
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

