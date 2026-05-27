interface SearchButtonProps {
  variant: 'desktop' | 'mobile';
  onClick: () => void;
}

export function SearchButton({ variant, onClick }: SearchButtonProps) {
  if (variant === 'desktop') {
    return (
      <div className="flex items-center pr-1">
        <button
          onClick={onClick}
          className="h-10 rounded-full bg-[#52655B] px-5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#4B5B4D]"
          type="button"
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#52655B] px-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#4B5B4D] active:scale-[0.99]"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      Buscar
    </button>
  );
}


