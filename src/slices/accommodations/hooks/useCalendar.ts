import { useState, useEffect } from 'react'
import { getFechasDisponiblesCompleto, getCalendarioHospedaje } from '../api/getCalendarioHospedaje'
import type { CalendarDate } from '../type'

interface UseCalendarProps {
  hospedajeId: string
}

interface UseCalendarReturn {
  availableDates: string[]
  calendarData: CalendarDate[]
  isLoading: boolean
  error: string | null
}

export function useCalendar({ 
  hospedajeId
}: UseCalendarProps): UseCalendarReturn {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [calendarData, setCalendarData] = useState<CalendarDate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar fechas disponibles al montar el componente
  useEffect(() => {
    if (!hospedajeId) return

    const loadCalendarData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Obtener todas las fechas del calendario que existen en Firebase
        const calendarDates = await getCalendarioHospedaje(hospedajeId)
        setCalendarData(calendarDates)

        // Generar rango de fechas para los próximos 12 meses
        const today = new Date()
        const oneYearFromNow = new Date()
        oneYearFromNow.setFullYear(today.getFullYear() + 1)
        
        const fechaInicio = today.toISOString().split('T')[0]
        const fechaFin = oneYearFromNow.toISOString().split('T')[0]

        // Obtener fechas disponibles completas (incluyendo las que no tienen documento)
        const available = await getFechasDisponiblesCompleto(hospedajeId, fechaInicio, fechaFin)
        setAvailableDates(available)

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMessage)
        console.error('Error cargando calendario:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCalendarData()
  }, [hospedajeId])

  return {
    availableDates,
    calendarData,
    isLoading,
    error
  }
}