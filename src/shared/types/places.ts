export interface Provincia {
  id: number;
  nombre: string;
  codigo: string;
}

export interface Canton {
  id: number;
  descripcion: string;
  codigo: string;
  provincia_id: number;
}

export interface Distrito {
  id: number;
  nombre: string;
  codigo: string;
  canton_id: number;
}

export interface UbicacionCompleta {
  provincia: Provincia;
  canton: Canton;
  distrito?: Distrito;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}