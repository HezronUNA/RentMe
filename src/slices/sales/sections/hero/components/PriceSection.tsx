interface PriceSectionProps {
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

export function PriceSection({
  variant,
  price,
  precioMax,
  onPriceChange,
  onPriceBlur,
  onPriceMaxChange,
  onPriceMaxBlur,
}: PriceSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="h-[56px] w-[240px] rounded-xl border border-zinc-300 bg-white/70 px-2.5 transition-colors hover:border-zinc-400 focus-within:border-[#52655B]/40 focus-within:ring-1 focus-within:ring-[#52655B]/10">
        <div className="grid h-full grid-cols-2 items-center gap-1.5">
          <div className="relative">
            <div className="relative">
              <ColonesMark className="left-2" />
              <input
                type="text"
                value={price}
                onChange={onPriceChange}
                onBlur={onPriceBlur}
                placeholder="Desde"
                className="h-[32px] w-full rounded-lg border border-zinc-300 bg-white py-1 pl-7 pr-2 text-left text-xs font-medium tracking-wide text-black outline-none transition-colors focus:border-[#52655B]/40 focus:ring-1 focus:ring-[#52655B]/10"
              />
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <ColonesMark className="left-2" />
              <input
                type="text"
                value={precioMax}
                onChange={onPriceMaxChange}
                onBlur={onPriceMaxBlur}
                placeholder="Hasta"
                className="h-[32px] w-full rounded-lg border border-zinc-300 bg-white py-1 pl-7 pr-2 text-left text-xs font-medium tracking-wide text-black outline-none transition-colors focus:border-[#52655B]/40 focus:ring-1 focus:ring-[#52655B]/10"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <p className="text-xs font-semibold text-neutral-900">Rango de precio</p>
      <p className="mt-0.5 text-xs text-neutral-500">Precios en colones costarricenses</p>
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
              className="w-full rounded-xl border border-neutral-100 bg-white py-2.5 pl-8 pr-2 text-sm font-medium text-neutral-900 outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/15"
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
              className="w-full rounded-xl border border-neutral-100 bg-white py-2.5 pl-8 pr-2 text-sm font-medium text-neutral-900 outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
