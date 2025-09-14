// src/slices/services/sections/waysWork/type.ts

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
}

export interface ModalidadServicio {
  id: string;
  nombre: string;
  textBoton?: string;
  serviciosAdicionales?: string[]; // Array de referencias "/servicios/4"
  serviciosIncluidos?: string[];   // Array de referencias "/servicios/1"
}

// En type.ts
export interface ModalidadConServicios {
  id: string;
  nombre: string;
  textBoton?: string;
  serviciosAdicionales?: (string | Servicio)[];
  serviciosIncluidos?: (string | Servicio)[];
  serviciosAdicionalesData: (string | Servicio)[];
  serviciosIncluidosData: (string | Servicio)[];
}