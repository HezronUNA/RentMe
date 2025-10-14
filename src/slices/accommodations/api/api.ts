// Archivo principal de API para hospedajes - Re-exportaciones
export { getHospedajes } from './getHospedajes'
export { getHospedajeById } from './getHospedajeById'
export { getHospedajesByPrice, getHospedajesDestacados } from './getHospedajesByPrice'
export { 
  getHospedajesByCapacity, 
  getHospedajesByServices, 
  getHospedajesByRules 
} from './getHospedajesByFilters'
export { getHospedajesByLocation, searchHospedajes } from './getHospedajesByLocation'
export { getHospedajesByDireccion, searchHospedajesCompleto } from './getHospedajesByDireccion'
export { 
  getHospedajesDisponibles, 
  isHospedajeDisponible, 
  getFechasOcupadas 
} from './getHospedajesDisponibles'
export {
  crearReservaHospedaje
} from './reservaHospedajeService'
export {
  getCalendarioHospedaje,
  getFechasDisponibles,
  getFechasEnRango,
  isFechaDisponible,
  getFechasDisponiblesCompleto
} from './getCalendarioHospedaje'