interface SearchButtonProps {
  variant: 'desktop' | 'mobile';
  onClick: () => void;
}

export function SearchButton({ variant, onClick }: SearchButtonProps) {
  if (variant === 'desktop') {
    return (
      <div className="px-4 flex items-center">
        <button 
          onClick={onClick}
          className="w-12 h-12 flex items-center justify-center bg-[#52655B] hover:bg-[#4B5B4D] transition-colors rounded-full cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center bg-[#52655B] hover:bg-[#4B5B4D] transition-colors rounded-full shadow-md cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  );
}
