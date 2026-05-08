export interface HospedajeDestacado {
  id: string
  nombre: string
  descripcion: string
  precioNoche: number
  Imagenes: string[]
  cuartos: number
  baños: number
  camas: number
  ubicacion: {
    direccion: string
  }
}


