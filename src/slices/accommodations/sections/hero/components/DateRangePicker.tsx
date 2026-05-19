import { useMemo } from 'react';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onClose: () => void;
}

interface DayInMonth {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onClose,
}: DateRangePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse dates
  const checkInDate = checkIn ? new Date(checkIn + 'T00:00:00') : null;
  const checkOutDate = checkOut ? new Date(checkOut + 'T00:00:00') : null;
  const currentDate = today;

  // Generate calendar months
  const months = useMemo(() => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + i);
      result.push(date);
    }
    return result;
  }, [currentDate]);

  // Generate days for each month
  const generateDaysForMonth = (monthDate: Date): DayInMonth[] => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Days from previous month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: DayInMonth[] = [];
    const current = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = current.getMonth() === month;
      const dateStr = current.toISOString().split('T')[0];
      const isSelected =
        (checkInDate && dateStr === checkIn) || (checkOutDate && dateStr === checkOut) || false;
      const isInRange =
        (checkInDate &&
        checkOutDate &&
        current > checkInDate &&
        current < checkOutDate) || false;
      const isStartDate = (checkInDate && dateStr === checkIn) || false;
      const isEndDate = (checkOutDate && dateStr === checkOut) || false;

      days.push({
        date: new Date(current),
        isCurrentMonth,
        isSelected,
        isInRange,
        isStartDate,
        isEndDate,
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Set check-in
      onCheckInChange(dateStr);
      onCheckOutChange('');
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        // If clicked date is before check-in, swap them
        onCheckOutChange(checkIn);
        onCheckInChange(dateStr);
      } else {
        // Set check-out
        onCheckOutChange(dateStr);
      }
    }
  };

  const handleQuickDuration = (days: number) => {
    const start = new Date(today);
    const end = new Date(today);
    end.setDate(end.getDate() + days);

    onCheckInChange(start.toISOString().split('T')[0]);
    onCheckOutChange(end.toISOString().split('T')[0]);
  };

  const handleClear = () => {
    onCheckInChange('');
    onCheckOutChange('');
  };

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  return (
    <>
      {/* Overlay backdrop - transparent, only for click detection */}
      <div 
        className="fixed inset-0 z-[9998]" 
        onClick={onClose}
      />
      {/* Calendar modal */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-3xl rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white px-6 py-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">Fechas</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Limpiar
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          {months.map((monthDate, monthIdx) => {
            const days = generateDaysForMonth(monthDate);
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();

            return (
              <div key={monthIdx}>
                {/* Month header */}
                <h4 className="text-center font-semibold text-zinc-900 mb-4">
                  {monthNames[month]} {year}
                </h4>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayLabels.map((label) => (
                    <div
                      key={label}
                      className="text-center text-xs font-medium text-zinc-500 py-2"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, idx) => {
                    const isDisabled = day.date < today;
                    const isHoverable = day.isCurrentMonth && !isDisabled;

                    return (
                      <button
                        key={idx}
                        onClick={() => isHoverable && handleDateClick(day.date)}
                        disabled={isDisabled}
                        className={`
                          py-2 text-xs font-medium rounded-lg transition-all
                          ${!day.isCurrentMonth ? 'text-zinc-300' : 'text-zinc-900'}
                          ${isDisabled ? 'text-zinc-300 cursor-not-allowed' : ''}
                          ${day.isInRange ? 'bg-[#52655B]/10' : ''}
                          ${day.isStartDate ? 'bg-[#52655B] text-white' : ''}
                          ${day.isEndDate ? 'bg-[#52655B] text-white' : ''}
                          ${isHoverable && !day.isSelected ? 'hover:bg-zinc-100 cursor-pointer' : ''}
                        `}
                      >
                        {day.date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick duration buttons */}
        <div className="mt-6 pt-6 border-t border-zinc-200 flex flex-wrap gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Fechas exactas
          </button>
          <button
            onClick={() => handleQuickDuration(1)}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ± 1 día
          </button>
          <button
            onClick={() => handleQuickDuration(2)}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ± 2 días
          </button>
          <button
            onClick={() => handleQuickDuration(3)}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ± 3 días
          </button>
          <button
            onClick={() => handleQuickDuration(7)}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ± 7 días
          </button>
          <button
            onClick={() => handleQuickDuration(14)}
            className="px-4 py-2 text-xs font-medium border border-zinc-300 rounded-full text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ± 14 días
          </button>
        </div>

        {/* Selected dates display */}
        {(checkInDate || checkOutDate) && (
          <div className="mt-4 pt-4 border-t border-zinc-200 text-sm text-zinc-600">
            {checkInDate && (
              <p>
                Entrada: <span className="font-semibold text-zinc-900">{checkIn}</span>
              </p>
            )}
            {checkOutDate && (
              <p>
                Salida: <span className="font-semibold text-zinc-900">{checkOut}</span>
              </p>
            )}
            {checkInDate &&
              checkOutDate &&
              checkOutDate > checkInDate && (
                <p className="mt-1 text-zinc-700">
                  Duración:{' '}
                  <span className="font-semibold">
                    {Math.ceil(
                      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
                    )}{' '}
                    noches
                  </span>
                </p>
              )}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
