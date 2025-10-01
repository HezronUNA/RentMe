import { AccommodationsHero, type AccommodationSearchFilters } from './sections/hero';

export default function AccommodationsPage() {
  const handleApplyFilters = (filters: AccommodationSearchFilters) => {
    console.log('Filtros aplicados:', filters);
    // Aquí puedes implementar la lógica para filtrar los alojamientos
  };

  return (
    <AccommodationsHero onApplyFilters={handleApplyFilters} />
  )
}
