// Exportar el componente principal
export { SalesService } from './sections/salesService/SalesService'

// Exportar componentes reutilizables
export { ModalidadCard } from './components/ModalidadCard'
export { ModalidadesGrid } from './components/ModalidadesGrid'

// Exportar hooks
export { useModalidadesServicio } from './hooks/useModalidadesServicio'

// Exportar APIs
export { getModalidadesServicio } from './api/getModalidades'
export { getAllServicios, getServicioById, getServiciosByIds } from './api/getServicios'

// Exportar tipos
export type { 
  ModalidadServicio, 
} from './api/getModalidades'

export type { 
  Servicio 
} from './api/getServicios'

export type { 
  ModalidadUI 
} from './hooks/useModalidadesServicio'