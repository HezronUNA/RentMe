interface AccommodationPriceSectionProps {
  variant: 'desktop' | 'mobile';
  price: string;
  precioMax: string;
  currency: 'USD' | 'CRC';
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceBlur: () => void;
  onPriceMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMaxBlur: () => void;
  onCurrencyToggle: () => void;
}

export function AccommodationPriceSection({
  variant,
  price,
  precioMax,
  currency,
  onPriceChange,
  onPriceBlur,
  onPriceMaxChange,
  onPriceMaxBlur,
  onCurrencyToggle,
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
              <button
                onClick={onCurrencyToggle}
                className="absolute left-2 top-[58%] -translate-y-1/2 text-zinc-500 font-medium hover:text-zinc-700 transition-colors px-1"
                type="button"
              >
                {currency === 'USD' ? '$' : '₡'}
              </button>
              <input
                type="text"
                value={price}
                onChange={onPriceChange}
                onBlur={onPriceBlur}
                placeholder="0"
                className="w-full border border-zinc-200 rounded-xl py-2.5 px-8 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
              />
            </div>
          </div>

          <div className="relative">
            <span className="text-zinc-500 text-[11px] font-medium block mb-1">Hasta</span>
            <div className="relative">
              <button
                onClick={onCurrencyToggle}
                className="absolute left-2 top-[58%] -translate-y-1/2 text-zinc-500 font-medium hover:text-zinc-700 transition-colors px-1"
                type="button"
              >
                {currency === 'USD' ? '$' : '₡'}
              </button>
              <input
                type="text"
                value={precioMax}
                onChange={onPriceMaxChange}
                onBlur={onPriceMaxBlur}
                placeholder="Sin límite"
                className="w-full border border-zinc-200 rounded-xl py-2.5 px-8 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 border-b border-zinc-200/80">
      <div className="text-zinc-700 text-xs font-semibold tracking-wide mb-2 uppercase">
        Rango de precio
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-zinc-500 text-[11px] font-medium mb-1 block">Desde</label>
          <div className="relative">
            <button
              onClick={onCurrencyToggle}
              className="absolute left-3 top-[58%] -translate-y-1/2 text-zinc-500 text-sm font-medium hover:text-zinc-700 transition-colors px-1"
              type="button"
            >
              {currency === 'USD' ? '$' : '₡'}
            </button>
            <input
              type="text"
              value={price}
              onChange={onPriceChange}
              onBlur={onPriceBlur}
              placeholder="0"
              className="w-full border border-zinc-200 rounded-xl py-2.5 px-9 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
            />
          </div>
        </div>

        <div>
          <label className="text-zinc-500 text-[11px] font-medium mb-1 block">Hasta</label>
          <div className="relative">
            <button
              onClick={onCurrencyToggle}
              className="absolute left-3 top-[58%] -translate-y-1/2 text-zinc-500 text-sm font-medium hover:text-zinc-700 transition-colors px-1"
              type="button"
            >
              {currency === 'USD' ? '$' : '₡'}
            </button>
            <input
              type="text"
              value={precioMax}
              onChange={onPriceMaxChange}
              onBlur={onPriceMaxBlur}
              placeholder="Sin límite"
              className="w-full border border-zinc-200 rounded-xl py-2.5 px-9 text-black text-sm font-medium tracking-wide text-left outline-none focus:border-zinc-400 transition-colors bg-zinc-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

