import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  crearReservaVenta,
} from '../api/reservaVentaService'
import type { 
  CrearReservaVenta, 
  EstadoReservaVenta 
} from '../type'

// Query Keys
export const reservasQueryKeys = {
  all: ['reservas-venta'] as const,
  lists: () => [...reservasQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...reservasQueryKeys.lists(), { filters }] as const,
  details: () => [...reservasQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...reservasQueryKeys.details(), id] as const,
  byPropiedad: (propiedadId: string) => [...reservasQueryKeys.all, 'propiedad', propiedadId] as const,
  byEstado: (estado: EstadoReservaVenta) => [...reservasQueryKeys.all, 'estado', estado] as const,
  byCliente: (email: string) => [...reservasQueryKeys.all, 'cliente', email] as const,
  recientes: (cantidad: number) => [...reservasQueryKeys.all, 'recientes', cantidad] as const,
}

/**
 * Hook para crear una nueva reserva de venta
 */
export function useCrearReservaVenta() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CrearReservaVenta) => crearReservaVenta(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservasQueryKeys.all })
      
    
      toast.success('¡Reserva creada exitosamente!', {
        description: 'Nos pondremos en contacto contigo pronto.',
      })
    },
    onError: () => {
      toast.error('Error al crear la reserva', {
        description: 'Por favor intenta nuevamente.',
      })
    }
  })
}
