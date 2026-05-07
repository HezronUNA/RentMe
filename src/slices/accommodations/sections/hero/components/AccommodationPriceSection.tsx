interface AccommodationPriceSectionProps {
  variant: 'desktop' | 'mobile';
  price: string;
  precioMax: string;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceBlur: () => void;
  onPriceMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMaxBlur: () => void;
}

function ColonesMark({ className = 'left-2.5' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute ${className} top-1/2 z-[1] -translate-y-1/2 text-sm font-semibold text-neutral-600`}
      aria-hidden
    >
      ₡
    </span>
  );
}

export function AccommodationPriceSection({
  variant,
  price,
  precioMax,
  onPriceChange,
  onPriceBlur,
  onPriceMaxChange,
  onPriceMaxBlur,
}: AccommodationPriceSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="w-[360px] px-6 py-3 flex flex-col justify-center border-r border-zinc-200">
        <div className="text-zinc-700 text-xs font-semibold tracking-wide text-left mb-2 uppercase">
          Rango de precio
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="text-zinc-500 text-[11px] font-medium block mb-1">Desde</span>
            <div className="relative">
              <ColonesMark className="left-2" />
              <input
                type="text"
                value={price}
                onChange={onPriceChange}
                onBlur={onPriceBlur}
                placeholder="0"
                className="w-full border border-zinc-200 rounded-xl py-2.5 pl-8 pr-2 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
              />
            </div>
          </div>
          <div className="relative">
            <span className="text-zinc-500 text-[11px] font-medium block mb-1">Hasta</span>
            <div className="relative">
              <ColonesMark className="left-2" />
              <input
                type="text"
                value={precioMax}
                onChange={onPriceMaxChange}
                onBlur={onPriceMaxBlur}
                placeholder="Sin límite"
                className="w-full border border-zinc-200 rounded-xl py-2.5 pl-8 pr-2 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3.5">
      <p className="text-xs font-semibold text-neutral-900">Rango de precio</p>
      <p className="mt-0.5 text-xs text-neutral-500">Por noche, en colones costarricenses</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-neutral-500">Mínimo</label>
          <div className="relative">
            <ColonesMark />
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={onPriceChange}
              onBlur={onPriceBlur}
              placeholder="0"
              className="w-full rounded-xl border border-neutral-100 bg-white py-3 pl-8 pr-2 text-base font-medium text-neutral-900 outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/15"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-neutral-500">Máximo</label>
          <div className="relative">
            <ColonesMark />
            <input
              type="text"
              inputMode="decimal"
              value={precioMax}
              onChange={onPriceMaxChange}
              onBlur={onPriceMaxBlur}
              placeholder="Sin límite"
              className="w-full rounded-xl border border-neutral-100 bg-white py-3 pl-8 pr-2 text-base font-medium text-neutral-900 outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
