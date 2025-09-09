import { DestinationSection } from './DestinationSection';
import { GuestsSection } from './GuestsSection';
import { PriceSection } from './PriceSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
}

export function SearchBox({ variant }: SearchBoxProps) {
  const [
    { guests, price, currency },
    { decreaseGuests, increaseGuests, handlePriceChange, handlePriceBlur, toggleCurrency, handleSearch }
  ] = useSearchBox();

  if (variant === 'desktop') {
    return (
      <div className="w-[1000px] bg-neutral-50 rounded-lg inline-flex items-stretch shadow-lg p-2">
        <DestinationSection variant="desktop" />
        <GuestsSection 
          variant="desktop"
          guests={guests}
          onDecrease={decreaseGuests}
          onIncrease={increaseGuests}
        />
        <PriceSection
          variant="desktop"
          price={price}
          currency={currency}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onCurrencyToggle={toggleCurrency}
        />
        <SearchButton variant="desktop" onClick={handleSearch} />
      </div>
    );
  }

  // Versión Mobile
  return (
    <div className="w-[95%] max-w-2xl mx-auto bg-neutral-50 rounded-lg shadow-lg p-2">
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 mx-2">
        <div className="text-zinc-600 text-lg font-medium tracking-wide">
          Buscar
        </div>
        <SearchButton variant="mobile" onClick={handleSearch} />
      </div>

      <DestinationSection variant="mobile" />
      <GuestsSection 
        variant="mobile"
        guests={guests}
        onDecrease={decreaseGuests}
        onIncrease={increaseGuests}
      />
      <PriceSection
        variant="mobile"
        price={price}
        currency={currency}
        onPriceChange={handlePriceChange}
        onPriceBlur={handlePriceBlur}
        onCurrencyToggle={toggleCurrency}
      />
    </div>
  );
}
