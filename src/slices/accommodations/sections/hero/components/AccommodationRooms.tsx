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
      <div className="h-[62px] w-[220px] shrink-0 rounded-2xl bg-white px-3 transition-colors hover:bg-[#f8faf8]">
        <label className="mb-1 block text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
          Huéspedes
        </label>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onDecrease}
            disabled={cuartos === 0}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            aria-label="Reducir huéspedes"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <span className="min-w-[96px] rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-center text-xs font-semibold text-zinc-800">
            {cuartos === 0 ? 'Huéspedes' : `${cuartos} huésp.`}
          </span>

          <button
            onClick={onIncrease}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
            type="button"
            aria-label="Aumentar huéspedes"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
        <svg className="h-5 w-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-neutral-900">¿Cuántos?</p>
        <p className="mt-0.5 text-sm text-neutral-500">
          {cuartos === 0 ? 'Selecciona cantidad' : `${cuartos} ${cuartos === 1 ? 'huésped' : 'huéspedes'}`}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1">
        <button
          onClick={onDecrease}
          disabled={cuartos === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-35"
          type="button"
          aria-label="Reducir huéspedes"
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
          aria-label="Aumentar huéspedes"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

