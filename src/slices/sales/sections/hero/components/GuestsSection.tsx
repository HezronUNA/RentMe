interface GuestsSectionProps {
  variant: 'desktop' | 'mobile';
  guests: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function GuestsSection({ variant, guests, onDecrease, onIncrease }: GuestsSectionProps) {
  if (variant === 'desktop') {
    return (
      <div className="w-52 px-6 py-5 flex flex-col justify-center border-r border-zinc-200 mx-2">
        <div className="text-zinc-600 text-base font-medium tracking-wide text-center mb-2">
          Huéspedes
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={onDecrease}
            className="w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-neutral-50 text-lg font-medium leading-none mb-0.5">-</span>
          </button>
          <div className="text-black text-lg font-medium tracking-wide min-w-[30px] text-center">
            {guests}
          </div>
          <button
            onClick={onIncrease}
            className="w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-neutral-50 text-lg font-medium leading-none">+</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2">
      <div className="text-zinc-600 text-lg font-medium tracking-wide mb-3">
        Huéspedes
      </div>
      <div className="flex justify-between items-center">
        <div className="text-black text-base font-medium">
          {guests} huéspedes
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onDecrease}
            className="w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-neutral-50 text-lg font-medium leading-none mb-0.5">-</span>
          </button>
          <button
            onClick={onIncrease}
            className="w-8 h-8 bg-zinc-600 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-neutral-50 text-lg font-medium leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
