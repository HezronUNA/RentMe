import { useState, useMemo } from 'react'

interface CalendarProps {
  availableDates?: string[] // Fechas disponibles en formato 'YYYY-MM-DD'
  minDate?: string
}

interface CalendarDate {
  date: string
  day: number
  isCurrentMonth: boolean
  isAvailable: boolean
  isPast: boolean
}

export function Calendar({ 
  availableDates = [], 
  minDate 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const today = new Date()
  const minDateObj = minDate ? new Date(minDate) : today

  const calendarDates = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // Primer día del mes
    const firstDayOfMonth = new Date(year, month, 1)
    // Último día del mes
    const lastDayOfMonth = new Date(year, month + 1, 0)
    
    // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
    // Ajustamos para que lunes sea 0
    let firstWeekday = firstDayOfMonth.getDay() - 1
    if (firstWeekday < 0) firstWeekday = 6
    
    const dates: CalendarDate[] = []
    
    // Agregar días del mes anterior para completar la primera semana
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i
      const dateStr = new Date(year, month - 1, day).toISOString().split('T')[0]
      dates.push({
        date: dateStr,
        day,
        isCurrentMonth: false,
        isAvailable: false,
        isPast: new Date(dateStr) < minDateObj
      })
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dateStr = new Date(year, month, day).toISOString().split('T')[0]
      const isPast = new Date(dateStr) < minDateObj
      const isAvailable = !isPast && availableDates.includes(dateStr)
      
      dates.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isAvailable,
        isPast
      })
    }
    
    // Agregar días del mes siguiente para completar las semanas
    const remainingCells = 42 - dates.length // 6 semanas * 7 días
    for (let day = 1; day <= remainingCells; day++) {
      const dateStr = new Date(year, month + 1, day).toISOString().split('T')[0]
      dates.push({
        date: dateStr,
        day,
        isCurrentMonth: false,
        isAvailable: false,
        isPast: new Date(dateStr) < minDateObj
      })
    }
    
    return dates
  }, [currentMonth, availableDates, minDateObj])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const getDayStyles = (dateData: CalendarDate) => {
    let baseClasses = "h-12 flex items-center justify-center text-sm font-medium border-r border-b border-gray-200 last:border-r-0"
    
    if (!dateData.isCurrentMonth) {
      return `${baseClasses} text-gray-300 opacity-50 bg-gray-50`
    }
    
    if (dateData.isPast) {
      return `${baseClasses} text-gray-400 opacity-60 bg-gray-100`
    }
    
    if (dateData.isAvailable) {
      return `${baseClasses} text-gray-900 bg-white hover:bg-blue-50 cursor-pointer transition-colors`
    }
    
    // No disponible - fondo gris más visible
    return `${baseClasses} text-white bg-gray-500 hover:bg-gray-600 transition-colors`
  }

  const canNavigatePrev = () => {
    const prevMonth = new Date(currentMonth)
    prevMonth.setMonth(currentMonth.getMonth() - 1)
    return prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1)
  }

  return (
    <div className="w-full p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header con navegación */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-black text-lg font-bold font-['Inter']">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <div className="flex items-center gap-1">
          {/* Botón anterior */}
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            disabled={!canNavigatePrev()}
            className={`p-2 rounded-lg ${
              canNavigatePrev() 
                ? 'hover:bg-gray-100 cursor-pointer' 
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            <svg 
              className={`w-4 h-4 ${canNavigatePrev() ? 'text-black' : 'text-zinc-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Botón siguiente */}
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg 
              className="w-4 h-4 text-black"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 border border-gray-200 border-b-0 rounded-t-lg overflow-hidden bg-gray-50 mb-0">
        {weekdays.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center border-r border-gray-200 last:border-r-0">
            <div className="text-gray-700 text-sm font-semibold font-['Inter']">
              {day}
            </div>
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
        {calendarDates.map((dateData, index) => (
          <div
            key={index}
            className={getDayStyles(dateData)}
          >
            {dateData.day}
          </div>
        ))}
      </div>

      {/* Leyenda simple */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-10 text-base text-gray-800 font-semibold">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 bg-gray-500 rounded"></div>
            <span>No disponible</span>
          </div>
        </div>
      </div>
    </div>
  )
}