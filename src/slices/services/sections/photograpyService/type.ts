export interface PhotographyItem {
  titulo?: string
  descripcion?: string
  icono?: string
}

export interface PhotographyService {
  id?: string
  descripcion?: string
  imagen?: string
  items?: PhotographyItem[]
}