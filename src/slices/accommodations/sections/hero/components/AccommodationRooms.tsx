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

  // Mobile — fila tipo “huéspedes” en Airbnb
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
        <svg className="h-5 w-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-neutral-900">Cuartos</p>
        <p className="mt-0.5 text-sm text-neutral-500">
          {cuartos === 0 ? 'Cualquiera' : `Mínimo ${cuartos} ${cuartos === 1 ? 'cuarto' : 'cuartos'}`}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1">
        <button
          onClick={onDecrease}
          disabled={cuartos === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-35"
          type="button"
          aria-label="Reducir cuartos"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span className="min-w-[1.25rem] text-center text-sm font-semibold tabular-nums text-neutral-900">{cuartos}</span>
        <button
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          type="button"
          aria-label="Aumentar cuartos"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

