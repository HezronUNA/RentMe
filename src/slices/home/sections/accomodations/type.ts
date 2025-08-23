export interface HospedajeDestacado {
  id: string
  nombre: string
  precioNoche: number
  Imagenes: string[]
  cuartos: number
  baños: number
  camas: number
  ubicacion: {
    direccion: string
  }
}
