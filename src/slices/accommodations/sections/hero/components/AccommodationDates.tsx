
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AccommodationDatesProps {
  variant: 'desktop' | 'mobile';
  entrada: string;
  salida: string;
  onEntradaChange: (value: string) => void;
  onSalidaChange: (value: string) => void;
}

export function AccommodationDates({ 
  variant, 
  entrada, 
  salida, 
  onEntradaChange, 
  onSalidaChange 
}: AccommodationDatesProps) {
  const [showEntradaCalendar, setShowEntradaCalendar] = useState(false);
  const [showSalidaCalendar, setShowSalidaCalendar] = useState(false);

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };

  const handleEntradaDateChange = (date: Date | null) => {
    if (date) {
      onEntradaChange(date.toISOString().split('T')[0]);
    }
    setShowEntradaCalendar(false);
  };

  const handleSalidaDateChange = (date: Date | null) => {
    if (date) {
      onSalidaChange(date.toISOString().split('T')[0]);
    }
    setShowSalidaCalendar(false);
  };
  if (variant === 'desktop') {
    return (
      <>
        <div className="flex-1 flex items-center border-r border-zinc-200 mx-2">
          <div className="w-full px-6 py-5 flex flex-col justify-center gap-3 relative">
            <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
              Entrada
            </div>
            <button 
              className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-gray-700 text-base font-medium hover:border-[#52655B] hover:text-[#52655B] hover:shadow-sm transition-all duration-200 focus:outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/10" 
              onClick={() => setShowEntradaCalendar(!showEntradaCalendar)}
              type="button"
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formatDateDisplay(entrada)}
              </div>
            </button>
            
            {showEntradaCalendar && (
              <div className="absolute top-full left-0 z-[9999] mt-2">
                <DatePicker
                  selected={entrada ? new Date(entrada) : new Date()}
                  onChange={handleEntradaDateChange}
                  minDate={new Date()}
                  maxDate={salida ? new Date(salida) : undefined}
                  inline
                  locale="es"
                  className="shadow-xl border border-zinc-200 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center border-r border-zinc-200 mx-2">
          <div className="w-full px-6 py-5 flex flex-col justify-center gap-3 relative">
            <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
              Salida
            </div>
            <button 
              className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-gray-700 text-base font-medium hover:border-[#52655B] hover:text-[#52655B] hover:shadow-sm transition-all duration-200 focus:outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/10" 
              onClick={() => setShowSalidaCalendar(!showSalidaCalendar)}
              type="button"
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formatDateDisplay(salida)}
              </div>
            </button>
            
            {showSalidaCalendar && (
              <div className="absolute top-full left-0 z-[9999] mt-2">
                <DatePicker
                  selected={salida ? new Date(salida) : new Date()}
                  onChange={handleSalidaDateChange}
                  minDate={entrada ? new Date(entrada) : new Date()}
                  inline
                  locale="es"
                  className="shadow-xl border border-zinc-200 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Mobile version
  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2">
      <div className="grid grid-cols-2 gap-6">
        <div className="relative">
          <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
            Entrada
          </div>
          <button 
            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-gray-700 text-sm font-medium hover:border-[#52655B] hover:text-[#52655B] hover:shadow-sm transition-all duration-200 focus:outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/10" 
            onClick={() => setShowEntradaCalendar(!showEntradaCalendar)}
            type="button"
          >
            <div className="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDateDisplay(entrada)}
            </div>
          </button>
          
          {showEntradaCalendar && (
            <div className="absolute top-full left-0 z-[9999] mt-2">
              <DatePicker
                selected={entrada ? new Date(entrada) : new Date()}
                onChange={handleEntradaDateChange}
                minDate={new Date()}
                maxDate={salida ? new Date(salida) : undefined}
                inline
                locale="es"
                className="shadow-xl border border-zinc-200 rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="relative">
          <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
            Salida
          </div>
          <button 
            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-gray-700 text-sm font-medium hover:border-[#52655B] hover:text-[#52655B] hover:shadow-sm transition-all duration-200 focus:outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/10" 
            onClick={() => setShowSalidaCalendar(!showSalidaCalendar)}
            type="button"
          >
            <div className="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDateDisplay(salida)}
            </div>
          </button>
          
          {showSalidaCalendar && (
            <div className="absolute top-full left-0 z-[9999] mt-2">
              <DatePicker
                selected={salida ? new Date(salida) : new Date()}
                onChange={handleSalidaDateChange}
                minDate={entrada ? new Date(entrada) : new Date()}
                inline
                locale="es"
                className="shadow-xl border border-zinc-200 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}