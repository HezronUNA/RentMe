interface BedroomsSectionProps {
  variant: 'desktop' | 'mobile';
  habitaciones: number;
  onHabitacionesChange: (habitaciones: number) => void;
}

export function BedroomsSection({ 
  variant, 
  habitaciones,
  onHabitacionesChange
}: BedroomsSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="h-[56px] w-[220px] rounded-xl border border-zinc-300 bg-white/70 px-3 transition-colors hover:border-zinc-400 focus-within:border-[#52655B]/40 focus-within:ring-1 focus-within:ring-[#52655B]/10">
        <label className="mb-1 block text-left text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
          Habitaciones
        </label>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onHabitacionesChange(Math.max(0, habitaciones - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors hover:border-zinc-400 hover:bg-zinc-100 hover:text-black"
            aria-label="Disminuir habitaciones"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <span className="min-w-[78px] rounded-lg border border-zinc-300 bg-white px-2 py-1 text-center text-xs font-semibold text-black">
            {habitaciones === 0 ? 'Todas' : `${habitaciones} hab`}
          </span>

          <button
            type="button"
            onClick={() => onHabitacionesChange(Math.min(5, habitaciones + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors hover:border-zinc-400 hover:bg-zinc-100 hover:text-black"
            aria-label="Aumentar habitaciones"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <label htmlFor="habitaciones-filter-mobile" className="mb-1.5 block text-[11px] font-medium text-neutral-500">
        Habitaciones
      </label>
      <select
        id="habitaciones-filter-mobile"
        value={habitaciones}
        onChange={(e) => onHabitacionesChange(Number(e.target.value))}
        className="w-full rounded-xl border border-neutral-100 bg-white px-3 py-2.5 text-sm font-medium text-neutral-900 outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/15"
      >
        <option value={0}>Todas</option>
        <option value={1}>1 habitación</option>
        <option value={2}>2 habitaciones</option>
        <option value={3}>3 habitaciones</option>
        <option value={4}>4 habitaciones</option>
        <option value={5}>5 o más</option>
      </select>
    </div>
  );
}

