import { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

interface AccommodationDatesProps {
  variant: 'desktop' | 'mobile';
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

export function AccommodationDates({
  variant,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: AccommodationDatesProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CR', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200 relative">
        <div className="w-full px-4 py-2 flex flex-col justify-center gap-1">
          <div className="text-zinc-600 text-[10px] font-semibold tracking-wide text-left uppercase">
            Fechas
          </div>

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            type="button"
            className="flex items-center gap-1 px-2 py-1.5 border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-300 transition-all duration-200 rounded-full text-left w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-zinc-600 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium text-zinc-700">
              {checkIn && checkOut
                ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                : checkIn
                ? `${formatDate(checkIn)} - ?`
                : 'Agregar fechas'}
            </span>
          </button>

          {showCalendar && (
            <DateRangePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={onCheckInChange}
              onCheckOutChange={onCheckOutChange}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="px-4 py-3.5 relative">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        type="button"
        className="flex w-full items-center gap-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
          <svg
            className="h-5 w-5 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-xs font-semibold text-neutral-900">Fechas</p>
          <p className="mt-0.5 text-sm text-neutral-500">
            {checkIn && checkOut
              ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
              : 'Agrega fechas'}
          </p>
        </div>
        <svg
          className={`h-5 w-5 text-neutral-600 flex-shrink-0 transition-transform duration-200 ${
            showCalendar ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showCalendar && (
        <div className="fixed inset-0 z-[9998] bg-black/20" onClick={() => setShowCalendar(false)} />
      )}

      {showCalendar && (
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={onCheckInChange}
          onCheckOutChange={onCheckOutChange}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
}
