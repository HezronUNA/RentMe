interface PriceSectionProps {
  variant: 'desktop' | 'mobile';
  price: string;
  currency: 'USD' | 'CRC';
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceBlur: () => void;
  onCurrencyToggle: () => void;
}

export function PriceSection({ 
  variant, 
  price, 
  currency, 
  onPriceChange, 
  onPriceBlur, 
  onCurrencyToggle 
}: PriceSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="w-64 px-6 py-5 flex flex-col justify-center border-r border-zinc-200 mx-2">
        <div className="text-zinc-600 text-base font-medium tracking-wide text-center mb-2">
          Precio
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-[160px]">
            <button
              onClick={onCurrencyToggle}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 font-medium hover:text-zinc-800 transition-colors px-1"
            >
              {currency === 'USD' ? '$' : '₡'}
            </button>
            <input
              type="text"
              value={price}
              onChange={onPriceChange}
              onBlur={onPriceBlur}
              placeholder="0.00"
              className="w-full border border-zinc-300 rounded-lg py-2 px-8 text-black text-lg font-medium tracking-wide text-center outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5">
      <div className="text-zinc-600 text-lg font-medium tracking-wide mb-3">
        Precio
      </div>
      <div className="flex items-center">
        <div className="relative w-full">
          <button
            onClick={onCurrencyToggle}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-medium hover:text-zinc-800 transition-colors px-1"
          >
            {currency === 'USD' ? '$' : '₡'}
          </button>
          <input
            type="text"
            value={price}
            onChange={onPriceChange}
            onBlur={onPriceBlur}
            placeholder="0.00"
            className="w-full border border-zinc-300 rounded-lg py-3 px-9 text-black text-lg font-medium tracking-wide text-left outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
