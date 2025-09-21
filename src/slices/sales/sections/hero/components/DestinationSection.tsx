import { useState } from 'react';

interface DestinationSectionProps {
  variant: 'desktop' | 'mobile';
  ubicacion: string;
  onUbicacionChange: (ubicacion: string) => void;
}

// Lista de cantones de Costa Rica (principales)
const cantones = [
  'San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú', 'Aserrí',
  'Mora', 'Goicoechea', 'Santa Ana', 'Alajuelita', 'Vásquez de Coronado',
  'Acosta', 'Tibás', 'Moravia', 'Montes de Oca', 'Turrubares', 'Dota',
  'Curridabat', 'Pérez Zeledón', 'León Cortés Castro', 'Alajuela', 'San Ramón',
  'Grecia', 'San Mateo', 'Atenas', 'Naranjo', 'Palmares', 'Poás',
  'Orotina', 'San Carlos', 'Zarcero', 'Sarchí', 'Upala', 'Los Chiles',
  'Guatuso', 'Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba',
  'Alvarado', 'Oreamuno', 'El Guarco', 'Heredia', 'Barva', 'Santo Domingo',
  'Santa Bárbara', 'San Rafael', 'San Isidro', 'Belén', 'Flores',
  'San Pablo', 'Sarapiquí', 'Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces',
  'Carrillo', 'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz',
  'Hojancha', 'Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro',
  'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita', 'Corredores',
  'Garabito', 'Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina',
  'Guácimo'
];

export function DestinationSection({ variant, ubicacion, onUbicacionChange }: DestinationSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCantones = cantones.filter(canton =>
    canton.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCanton = (canton: string) => {
    onUbicacionChange(canton);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onUbicacionChange('');
    setIsOpen(false);
    setSearchTerm('');
  };

  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200 mx-2 relative">
        <div className="w-full px-8 py-5 flex flex-col justify-center gap-3">
          <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
            Ubicación
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 w-full text-left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="text-black text-base font-medium">
              {ubicacion || 'Selecciona una ubicación'}
            </div>
            <svg 
              className={`h-4 w-4 text-zinc-600 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 mt-1">
              <div className="p-3 border-b border-zinc-200">
                <input
                  type="text"
                  placeholder="Buscar cantón..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-600"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {ubicacion && (
                  <button
                    onClick={handleClearSelection}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 border-b border-zinc-200"
                  >
                    Limpiar selección
                  </button>
                )}
                {filteredCantones.map((canton) => (
                  <button
                    key={canton}
                    onClick={() => handleSelectCanton(canton)}
                    className={`w-full px-4 py-2 text-left hover:bg-zinc-50 ${
                      ubicacion === canton ? 'bg-blue-50 text-blue-700' : 'text-black'
                    }`}
                  >
                    {canton}
                  </button>
                ))}
                {filteredCantones.length === 0 && (
                  <div className="px-4 py-2 text-zinc-500 text-center">
                    No se encontraron cantones
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2 relative">
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Ubicación
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <div className="text-black text-sm font-medium flex-1">
          {ubicacion || 'Selecciona una ubicación'}
        </div>
        <svg 
          className={`h-4 w-4 text-zinc-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 mt-1">
          <div className="p-3 border-b border-zinc-200">
            <input
              type="text"
              placeholder="Buscar cantón..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-600"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {ubicacion && (
              <button
                onClick={handleClearSelection}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 border-b border-zinc-200"
              >
                Limpiar selección
              </button>
            )}
            {filteredCantones.map((canton) => (
              <button
                key={canton}
                onClick={() => handleSelectCanton(canton)}
                className={`w-full px-4 py-2 text-left hover:bg-zinc-50 ${
                  ubicacion === canton ? 'bg-blue-50 text-blue-700' : 'text-black'
                }`}
              >
                {canton}
              </button>
            ))}
            {filteredCantones.length === 0 && (
              <div className="px-4 py-2 text-zinc-500 text-center">
                No se encontraron cantones
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
