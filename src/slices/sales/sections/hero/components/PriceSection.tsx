interface PriceSectionProps {
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

export function PriceSection({ 
  variant, 
  price, 
  precioMax,
  currency, 
  onPriceChange, 
  onPriceBlur,
  onPriceMaxChange,
  onPriceMaxBlur,
  onCurrencyToggle 
}: PriceSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="w-80 px-6 py-5 flex flex-col justify-center border-r border-zinc-200 mx-2">
        <div className="text-zinc-600 text-base font-medium tracking-wide text-center mb-3">
          Rango de Precio
        </div>
        
        <div className="space-y-3">
          {/* Precio Mínimo */}
          <div className="flex items-center">
            <span className="text-zinc-600 text-sm font-medium w-12">Desde</span>
            <div className="relative flex-1">
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
                placeholder="0"
                className="w-full border border-zinc-300 rounded-lg py-2 px-8 text-black text-base font-medium tracking-wide text-center outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Precio Máximo */}
          <div className="flex items-center">
            <span className="text-zinc-600 text-sm font-medium w-12">Hasta</span>
            <div className="relative flex-1">
              <button
                onClick={onCurrencyToggle}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 font-medium hover:text-zinc-800 transition-colors px-1"
              >
                {currency === 'USD' ? '$' : '₡'}
              </button>
              <input
                type="text"
                value={precioMax}
                onChange={onPriceMaxChange}
                onBlur={onPriceMaxBlur}
                placeholder="Sin límite"
                className="w-full border border-zinc-300 rounded-lg py-2 px-8 text-black text-base font-medium tracking-wide text-center outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2">
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Rango de Precio
      </div>
      
      <div className="space-y-3">
        {/* Precio Mínimo - Mobile */}
        <div>
          <label className="text-zinc-600 text-xs font-medium mb-1 block">Desde</label>
          <div className="relative">
            <button
              onClick={onCurrencyToggle}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-medium hover:text-zinc-800 transition-colors px-1"
            >
              {currency === 'USD' ? '$' : '₡'}
            </button>
            <input
              type="text"
              value={price}
              onChange={onPriceChange}
              onBlur={onPriceBlur}
              placeholder="0"
              className="w-full border border-zinc-300 rounded-lg py-2.5 px-9 text-black text-base font-medium tracking-wide text-left outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Precio Máximo - Mobile */}
        <div>
          <label className="text-zinc-600 text-xs font-medium mb-1 block">Hasta</label>
          <div className="relative">
            <button
              onClick={onCurrencyToggle}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-medium hover:text-zinc-800 transition-colors px-1"
            >
              {currency === 'USD' ? '$' : '₡'}
            </button>
            <input
              type="text"
              value={precioMax}
              onChange={onPriceMaxChange}
              onBlur={onPriceMaxBlur}
              placeholder="Sin límite"
              className="w-full border border-zinc-300 rounded-lg py-2.5 px-9 text-black text-base font-medium tracking-wide text-left outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
