# AGENTS.md - RentMe Platform

## 📋 INFORMACIÓN DEL PROYECTO

### Descripción General

Plataforma web integral para negocio de alquileres y venta de propiedades en Costa Rica, con tres componentes principales:

1. **Hospedajes**: Sistema completo de alquiler de propiedades con calendarios iCal sincronizados (Airbnb, Booking, VRBO)
2. **Ventas de Propiedades**: Catálogo de propiedades en venta con sistema de intereses
3. **Servicios**: Reserva de servicios adicionales (tours, transporte, etc.)

### Stack Tecnológico

- **Frontend**: React 18 + Vite 5.x + TypeScript
- **Estilos**: Tailwind CSS 3.x + shadcn/ui
- **Base de Datos**: Supabase (PostgreSQL) con acceso directo
- **Autenticación**: Supabase Auth
- **Estado Global**: Context API + Custom Hooks
- **Routing**: React Router v6
- **Formularios**: React Hook Form + Zod (a implementar)
- **Peticiones HTTP**: Fetch API nativo
- **APIs Externas**:
  - API de cantones y provincias de Costa Rica
  - Calendarios iCal (Airbnb, Booking, VRBO, Google Calendar)
- **Deployment**: Vercel

### Características Principales

- 🏠 Sistema de hospedajes con filtros avanzados (precio, ubicación, tipo, servicios)
- 📅 Sincronización automática de calendarios de múltiples plataformas (iCal)
- 🏘️ Propiedades en venta con galería de imágenes y amenidades
- 🎫 Sistema de reservas para hospedajes y servicios
- ⭐ Sistema de reseñas y calificaciones
- 👥 Panel de administración con roles (admin/editor)
- 🔐 Auditoría de intentos de login
- 🗺️ Integración con API de ubicaciones de Costa Rica

---

## 🗄️ ESQUEMA DE BASE DE DATOS (Supabase)

### Extensiones Habilitadas

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- Generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";      -- Funciones criptográficas
```

### Estructura de Tablas

#### 1. 🏠 MÓDULO DE HOSPEDAJES

##### **tipo_hospedaje**

```sql
CREATE TABLE tipo_hospedaje (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR UNIQUE NOT NULL,          -- Casa, Apartamento, Cabaña, etc.
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE tipo_hospedaje ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON tipo_hospedaje FOR SELECT USING (true);
```

##### **hospedajes**

```sql
CREATE TABLE hospedajes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR NOT NULL,
  descripcion TEXT,
  cuartos INTEGER DEFAULT 0,
  banos INTEGER DEFAULT 0,
  camas INTEGER DEFAULT 0,
  tipo_hospedaje_id UUID REFERENCES tipo_hospedaje(id),
  ubicacion TEXT,                          -- Provincia, Cantón, Distrito
  precio_noche NUMERIC NOT NULL,
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hospedajes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public read active accommodations"
  ON hospedajes FOR SELECT
  USING (activo = true);

CREATE POLICY "Admin full access"
  ON hospedajes FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

##### **hospedaje_imagenes**

```sql
CREATE TABLE hospedaje_imagenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospedaje_id UUID REFERENCES hospedajes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,                       -- URL de la imagen
  orden INTEGER DEFAULT 0,
  es_principal BOOLEAN DEFAULT false       -- Imagen destacada
);

ALTER TABLE hospedaje_imagenes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read images" ON hospedaje_imagenes FOR SELECT USING (true);
```

##### **servicios** (WiFi, Piscina, Estacionamiento, etc.)

```sql
CREATE TABLE servicios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR NOT NULL,
  icono TEXT                               -- Nombre del ícono o clase CSS
);

-- NO tiene RLS, es catálogo público
```

##### **hospedaje_servicios** (Relación N:N)

```sql
CREATE TABLE hospedaje_servicios (
  hospedaje_id UUID REFERENCES hospedajes(id) ON DELETE CASCADE,
  servicio_id UUID REFERENCES servicios(id) ON DELETE CASCADE,
  PRIMARY KEY (hospedaje_id, servicio_id)
);

ALTER TABLE hospedaje_servicios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON hospedaje_servicios FOR SELECT USING (true);
```

##### **reglas** (No fumar, No mascotas, etc.)

```sql
CREATE TABLE reglas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR NOT NULL,
  descripcion TEXT
);
```

##### **hospedaje_reglas** (Relación N:N)

```sql
CREATE TABLE hospedaje_reglas (
  hospedaje_id UUID REFERENCES hospedajes(id) ON DELETE CASCADE,
  regla_id UUID REFERENCES reglas(id) ON DELETE CASCADE,
  PRIMARY KEY (hospedaje_id, regla_id)
);

ALTER TABLE hospedaje_reglas ENABLE ROW LEVEL SECURITY;
```

##### **hospedaje_calendarios** (Gestión de calendarios iCal)

```sql
CREATE TABLE hospedaje_calendarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospedaje_id UUID REFERENCES hospedajes(id) ON DELETE CASCADE,
  plataforma TEXT NOT NULL,                -- 'airbnb', 'booking', 'vrbo', 'expedia', 'googleCalendar'
  ical_url TEXT NOT NULL,                  -- URL del calendario iCal
  activo BOOLEAN DEFAULT true,             -- Si está activo para sincronización
  ultimo_sync TIMESTAMPTZ,                 -- Última vez que se sincronizó
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hospedaje_calendarios_hospedaje ON hospedaje_calendarios(hospedaje_id);
CREATE INDEX idx_hospedaje_calendarios_activo ON hospedaje_calendarios(activo) WHERE activo = true;

COMMENT ON TABLE hospedaje_calendarios IS 'Gestión de múltiples calendarios iCal por hospedaje';
COMMENT ON COLUMN hospedaje_calendarios.plataforma IS 'Nombre de la plataforma: airbnb, booking, vrbo, expedia, googleCalendar';
```

##### **calendario_bloqueos** (Fechas bloqueadas de calendarios)

```sql
CREATE TABLE calendario_bloqueos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospedaje_id UUID REFERENCES hospedajes(id) ON DELETE CASCADE,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  fuente VARCHAR NOT NULL,                 -- 'internal', 'airbnb', 'booking', 'vrbo', etc.
  referencia_externa TEXT,                 -- ID de reserva externa si aplica
  hospedaje_calendario_id UUID REFERENCES hospedaje_calendarios(id),
  creado_en TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_date_range CHECK (fecha_fin >= fecha_inicio)
);

CREATE INDEX idx_bloqueos_hospedaje ON calendario_bloqueos(hospedaje_id);
CREATE INDEX idx_bloqueos_fechas ON calendario_bloqueos(fecha_inicio, fecha_fin);
CREATE INDEX idx_bloqueos_calendario ON calendario_bloqueos(hospedaje_calendario_id);

COMMENT ON COLUMN calendario_bloqueos.hospedaje_calendario_id IS 'Referencia al calendario específico que generó este bloqueo';
```

#### 2. 🏘️ MÓDULO DE VENTAS

##### **propiedades_venta**

```sql
CREATE TABLE propiedades_venta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  descripcion TEXT NOT NULL,
  habitaciones INTEGER DEFAULT 0,
  banos INTEGER DEFAULT 0,
  area_terreno NUMERIC,                    -- En m²
  estado VARCHAR CHECK (estado IN ('disponible', 'reservada', 'vendida')),
  ano_construccion INTEGER,
  precio NUMERIC NOT NULL,
  ubicacion TEXT,                          -- Provincia, Cantón
  ubicacion_exacta TEXT,                   -- Dirección completa (privada)
  asesor_responsable UUID,                 -- Referencia a admin_users
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_propiedades_estado ON propiedades_venta(estado);
CREATE INDEX idx_propiedades_precio ON propiedades_venta(precio);
```

##### **propiedades_venta_imagenes**

```sql
CREATE TABLE propiedades_venta_imagenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  propiedad_venta_id UUID REFERENCES propiedades_venta(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  es_principal BOOLEAN DEFAULT false
);
```

##### **amenidades** (Piscina, Garaje, Jardín, etc.)

```sql
CREATE TABLE amenidades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR NOT NULL
);
```

##### **propiedad_amenidades** (Relación N:N)

```sql
CREATE TABLE propiedad_amenidades (
  propiedad_venta_id UUID REFERENCES propiedades_venta(id) ON DELETE CASCADE,
  amenidad_id UUID REFERENCES amenidades(id) ON DELETE CASCADE,
  PRIMARY KEY (propiedad_venta_id, amenidad_id)
);
```

#### 3. 🎫 MÓDULO DE RESERVAS

##### **reservas_hospedaje**

```sql
CREATE TABLE reservas_hospedaje (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospedaje_id UUID REFERENCES hospedajes(id),
  usuario_id UUID REFERENCES auth.users(id),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado VARCHAR CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  total NUMERIC,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reservas_hospedaje_dates ON reservas_hospedaje(fecha_inicio, fecha_fin);
CREATE INDEX idx_reservas_hospedaje_estado ON reservas_hospedaje(estado);
```

##### **reservas_servicios**

```sql
CREATE TABLE reservas_servicios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  servicio_id UUID REFERENCES servicios(id),
  cliente_id UUID REFERENCES auth.users(id),
  fecha DATE NOT NULL,
  hora_inicio TIME,
  hora_fin TIME,
  modalidad VARCHAR,                       -- 'presencial', 'virtual', etc.
  estado VARCHAR CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  notas TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);
```

##### **reserva_propiedad_venta** (Sistema de intereses)

```sql
CREATE TABLE reserva_propiedad_venta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  propiedad_venta_id UUID REFERENCES propiedades_venta(id),
  usuario_id UUID REFERENCES auth.users(id),
  estado VARCHAR CHECK (estado IN ('interesado', 'en_negociacion', 'cerrado')),
  notas TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. ⭐ MÓDULO DE RESEÑAS

##### **resenas**

```sql
CREATE TABLE resenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospedaje_id UUID REFERENCES hospedajes(id),
  usuario_id UUID REFERENCES auth.users(id),
  calificacion INTEGER CHECK (calificacion BETWEEN 1 AND 5),
  comentario TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. 👥 MÓDULO DE ADMINISTRACIÓN

##### **admin_users**

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  nombre VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  role VARCHAR CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);

COMMENT ON TABLE admin_users IS 'Usuarios administradores del sistema';
COMMENT ON COLUMN admin_users.role IS 'admin: acceso total | editor: acceso limitado';
```

##### **login_attempts** (Auditoría)

```sql
CREATE TABLE login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email VARCHAR NOT NULL,
  success BOOLEAN DEFAULT false,
  reason VARCHAR,                          -- 'invalid_password', 'user_not_found', etc.
  ip_address INET,
  user_agent TEXT,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_login_attempts_email ON login_attempts(email);
CREATE INDEX idx_login_attempts_attempted_at ON login_attempts(attempted_at);

COMMENT ON TABLE login_attempts IS 'Registro de intentos de inicio de sesión para auditoría y seguridad';
```

### 🔄 Funciones y Triggers

```sql
-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a tablas relevantes
CREATE TRIGGER update_hospedajes_updated_at
  BEFORE UPDATE ON hospedajes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_propiedades_venta_updated_at
  BEFORE UPDATE ON propiedades_venta
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 📊 Índices para Optimización

```sql
-- Búsqueda de hospedajes
CREATE INDEX idx_hospedajes_precio ON hospedajes(precio_noche);
CREATE INDEX idx_hospedajes_activo ON hospedajes(activo) WHERE activo = true;
CREATE INDEX idx_hospedajes_tipo ON hospedajes(tipo_hospedaje_id);
CREATE INDEX idx_hospedajes_ubicacion ON hospedajes USING gin(to_tsvector('spanish', ubicacion));

-- Búsqueda de propiedades en venta
CREATE INDEX idx_propiedades_precio ON propiedades_venta(precio);
CREATE INDEX idx_propiedades_estado ON propiedades_venta(estado) WHERE estado = 'disponible';
CREATE INDEX idx_propiedades_ubicacion ON propiedades_venta USING gin(to_tsvector('spanish', ubicacion));

-- Calendario y bloqueos
CREATE INDEX idx_bloqueos_dates ON calendario_bloqueos(hospedaje_id, fecha_inicio, fecha_fin);
```

---

## 📁 ESTRUCTURA DE DIRECTORIOS

```
RentMe/
├── public/                          # Archivos estáticos
│
├── src/
│   ├── App.tsx                      # Componente principal
│   ├── main.tsx                     # Entry point
│   ├── vite-env.d.ts
│   │
│   ├── app/                         # Configuración global
│   │   ├── AuthProvider.tsx         # Context de autenticación
│   │   ├── Layout.tsx               # Layout principal
│   │   ├── NotFoundPage.tsx
│   │   ├── router.tsx               # React Router config
│   │   └── styles.css               # Estilos globales
│   │
│   ├── lib/
│   │   └── utils.ts                 # Utilidades (cn, clsx)
│   │
│   ├── services/
│   │   ├── firebase/                # 🔄 MIGRAR A SUPABASE
│   │   │   ├── auth.ts
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── supabase/                # ✅ NUEVO
│   │   │   ├── client.ts            # Cliente Supabase
│   │   │   ├── auth.ts              # Autenticación
│   │   │   ├── hospedajes.service.ts
│   │   │   ├── ventas.service.ts
│   │   │   ├── reservas.service.ts
│   │   │   ├── calendar.service.ts  # Sincronización iCal
│   │   │   └── types.ts             # Database types
│   │   │
│   │   └── externalAPI/             # APIs externas (Costa Rica)
│   │       ├── getAllCantones.ts
│   │       ├── getAllCantonesSimple.ts
│   │       ├── getCantonesByProvincia.ts
│   │       └── getProvincias.ts
│   │
│   ├── shared/                      # Código compartido
│   │   ├── api/
│   │   │   ├── getHero.ts
│   │   │   └── getTitles.ts
│   │   │
│   │   ├── assets/                  # Imágenes, iconos
│   │   │
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Header.tsx           # Header principal
│   │   │   ├── DesktopHeader.tsx
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── SocialBar.tsx
│   │   │   ├── Sonner.tsx           # Toasts
│   │   │   └── Typography.tsx
│   │   │
│   │   ├── context/
│   │   │   ├── IconContext.tsx
│   │   │   └── IconProvider.tsx
│   │   │
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAllCantones.ts
│   │   │   ├── useAuth.ts
│   │   │   ├── useCarrouselScroll.ts
│   │   │   ├── useDestinationLogic.ts
│   │   │   ├── useHero.ts
│   │   │   ├── useIcons.ts
│   │   │   ├── useNavbar.ts
│   │   │   └── useTitles.ts
│   │   │
│   │   ├── pages/                   # Páginas compartidas (si aplica)
│   │   │
│   │   ├── types/
│   │   │   ├── places.ts            # Tipos de ubicaciones CR
│   │   │   ├── socialMedia.ts
│   │   │   └── titles.ts
│   │   │
│   │   └── utils/
│   │       └── socialMediaConfig.ts
│   │
│   └── slices/                      # Módulos por feature
│       │
│       ├── aboutUs/                 # Página "Sobre Nosotros"
│       │   ├── Page.tsx
│       │   ├── api/
│       │   │   ├── getObjetive.ts
│       │   │   ├── getWaysWork.ts
│       │   │   └── getWhatWeDo.ts
│       │   ├── assets/
│       │   │   └── assets.ts
│       │   ├── hooks/
│       │   │   ├── useObjetive.ts
│       │   │   ├── useWaysWork.ts
│       │   │   └── useWhatWeDo.ts
│       │   ├── sections/
│       │   │   ├── banner/
│       │   │   ├── ourObjetive/
│       │   │   ├── propertyPromotions/
│       │   │   ├── waysWork/
│       │   │   └── whatWeDo/
│       │   └── utils/
│       │       └── utils.ts
│       │
│       ├── accommodations/          # 🏠 MÓDULO DE HOSPEDAJES
│       │   ├── Page.tsx             # Listado de hospedajes
│       │   ├── AccommodationDetail.tsx
│       │   ├── type.ts              # Tipos TypeScript
│       │   │
│       │   ├── api/
│       │   │   ├── api.ts
│       │   │   ├── getHospedajes.ts
│       │   │   ├── getHospedajeById.ts
│       │   │   ├── getHospedajesByFilters.ts
│       │   │   ├── getHospedajesByLocation.ts
│       │   │   ├── getHospedajesByPrice.ts
│       │   │   ├── getHospedajesByDireccion.ts
│       │   │   └── getCalendarioHospedaje.ts
│       │   │
│       │   ├── assets/
│       │   │
│       │   ├── components/          # Componentes específicos
│       │   │   ├── AccommodationCard.tsx
│       │   │   ├── FilterBar.tsx
│       │   │   ├── CalendarView.tsx
│       │   │   └── BookingForm.tsx
│       │   │
│       │   ├── hooks/
│       │   │   ├── useHospedajes.ts
│       │   │   ├── useHospedajeDetail.ts
│       │   │   ├── useCalendar.ts
│       │   │   └── useFilters.ts
│       │   │
│       │   ├── sections/
│       │   │   ├── hero/
│       │   │   ├── filters/
│       │   │   ├── listings/
│       │   │   └── detail/
│       │   │
│       │   └── utils/
│       │       ├── filters.ts
│       │       ├── calendar.ts
│       │       └── pricing.ts
│       │
│       ├── sales/                   # 🏘️ MÓDULO DE VENTAS
│       │   ├── Page.tsx             # Listado de propiedades
│       │   ├── SaleDetail.tsx       # Detalle de propiedad
│       │   ├── type.ts
│       │   │
│       │   ├── api/
│       │   │   ├── getProperties.ts
│       │   │   ├── getPropertyById.ts
│       │   │   ├── getPropertiesByFilters.ts
│       │   │   └── submitInterest.ts
│       │   │
│       │   ├── components/
│       │   │   ├── PropertyCard.tsx
│       │   │   ├── PropertyFilters.tsx
│       │   │   ├── PropertyGallery.tsx
│       │   │   └── InterestForm.tsx
│       │   │
│       │   ├── hooks/
│       │   │   ├── useProperties.ts
│       │   │   ├── usePropertyDetail.ts
│       │   │   └── useInterestForm.ts
│       │   │
│       │   └── sections/
│       │       ├── hero/
│       │       ├── featured/
│       │       └── listings/
│       │
│       ├── services/                # 🎫 MÓDULO DE SERVICIOS
│       │   ├── Page.tsx
│       │   ├── ServiceDetailPage.tsx
│       │   │
│       │   ├── api/
│       │   │   ├── getServices.ts
│       │   │   ├── getServiceById.ts
│       │   │   └── bookService.ts
│       │   │
│       │   ├── components/
│       │   │   ├── ServiceCard.tsx
│       │   │   └── BookingForm.tsx
│       │   │
│       │   └── hooks/
│       │       └── useServices.ts
│       │
│       └── home/                    # 🏡 HOMEPAGE
│           ├── Page.tsx
│           ├── api/
│           ├── assets/
│           ├── hooks/
│           ├── sections/
│           │   ├── hero/
│           │   ├── featured/
│           │   ├── services/
│           │   └── testimonials/
│           └── utils/
│
├── .env                             # Variables de entorno
├── .env.example
├── .gitignore
├── components.json                  # shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

---

## 🔧 ARCHIVOS DE CONFIGURACIÓN

### Variables de Entorno

```bash
# .env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Firebase (Temporal - durante migración)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id

# URLs
VITE_API_URL=http://localhost:5173
VITE_EXTERNAL_API_CR=https://api.hacienda.go.cr

# Feature Flags
VITE_ENABLE_CALENDAR_SYNC=true
VITE_ENABLE_PAYMENTS=false
```

### Configuración de Supabase

```typescript
// src/services/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "rentme-auth",
  },
});

// Cliente con service role para operaciones admin (solo backend)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
```

### Tipos de Base de Datos

```typescript
// src/services/supabase/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      hospedajes: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          cuartos: number;
          banos: number;
          camas: number;
          tipo_hospedaje_id: string;
          ubicacion: string | null;
          precio_noche: number;
          activo: boolean;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          descripcion?: string | null;
          cuartos?: number;
          banos?: number;
          camas?: number;
          tipo_hospedaje_id: string;
          ubicacion?: string | null;
          precio_noche: number;
          activo?: boolean;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          nombre?: string;
          descripcion?: string | null;
          cuartos?: number;
          banos?: number;
          camas?: number;
          tipo_hospedaje_id?: string;
          ubicacion?: string | null;
          precio_noche?: number;
          activo?: boolean;
          actualizado_en?: string;
        };
      };
      propiedades_venta: {
        Row: {
          id: string;
          descripcion: string;
          habitaciones: number;
          banos: number;
          area_terreno: number | null;
          estado: "disponible" | "reservada" | "vendida";
          ano_construccion: number | null;
          precio: number;
          ubicacion: string | null;
          ubicacion_exacta: string | null;
          asesor_responsable: string | null;
          activo: boolean;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          descripcion: string;
          habitaciones?: number;
          banos?: number;
          area_terreno?: number | null;
          estado: "disponible" | "reservada" | "vendida";
          ano_construccion?: number | null;
          precio: number;
          ubicacion?: string | null;
          ubicacion_exacta?: string | null;
          asesor_responsable?: string | null;
          activo?: boolean;
        };
        Update: {
          descripcion?: string;
          habitaciones?: number;
          banos?: number;
          area_terreno?: number | null;
          estado?: "disponible" | "reservada" | "vendida";
          ano_construccion?: number | null;
          precio?: number;
          ubicacion?: string | null;
          activo?: boolean;
        };
      };
      // ... Resto de tablas
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
```

### Servicios de Supabase

```typescript
// src/services/supabase/hospedajes.service.ts
import { supabase } from "./client";
import type { Database } from "./types";

type Hospedaje = Database["public"]["Tables"]["hospedajes"]["Row"];
type HospedajeInsert = Database["public"]["Tables"]["hospedajes"]["Insert"];

export class HospedajesService {
  /**
   * Obtener todos los hospedajes activos
   */
  static async getAll() {
    const { data, error } = await supabase
      .from("hospedajes")
      .select(
        `
        *,
        tipo:tipo_hospedaje(id, nombre),
        imagenes:hospedaje_imagenes(id, url, orden, es_principal),
        servicios:hospedaje_servicios(servicio:servicios(id, nombre, icono))
      `,
      )
      .eq("activo", true)
      .order("creado_en", { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Obtener hospedaje por ID con detalles completos
   */
  static async getById(id: string) {
    const { data, error } = await supabase
      .from("hospedajes")
      .select(
        `
        *,
        tipo:tipo_hospedaje(*),
        imagenes:hospedaje_imagenes(*),
        servicios:hospedaje_servicios(servicio:servicios(*)),
        reglas:hospedaje_reglas(regla:reglas(*)),
        calendarios:hospedaje_calendarios(*),
        bloqueos:calendario_bloqueos(*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Filtrar hospedajes por criterios
   */
  static async filterBy(filters: {
    precioMin?: number;
    precioMax?: number;
    ubicacion?: string;
    tipo?: string;
    cuartos?: number;
    servicios?: string[];
  }) {
    let query = supabase
      .from("hospedajes")
      .select(
        `
        *,
        tipo:tipo_hospedaje(nombre),
        imagenes:hospedaje_imagenes(*),
        servicios:hospedaje_servicios(servicio:servicios(*))
      `,
      )
      .eq("activo", true);

    if (filters.precioMin) {
      query = query.gte("precio_noche", filters.precioMin);
    }

    if (filters.precioMax) {
      query = query.lte("precio_noche", filters.precioMax);
    }

    if (filters.ubicacion) {
      query = query.ilike("ubicacion", `%${filters.ubicacion}%`);
    }

    if (filters.tipo) {
      query = query.eq("tipo_hospedaje_id", filters.tipo);
    }

    if (filters.cuartos) {
      query = query.gte("cuartos", filters.cuartos);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Filtrar por servicios si se especifican
    if (filters.servicios && filters.servicios.length > 0) {
      return data.filter((hospedaje) =>
        filters.servicios!.every((servicioId) =>
          hospedaje.servicios.some((s) => s.servicio.id === servicioId),
        ),
      );
    }

    return data;
  }

  /**
   * Verificar disponibilidad en fechas
   */
  static async checkAvailability(
    hospedajeId: string,
    fechaInicio: Date,
    fechaFin: Date,
  ) {
    const { data, error } = await supabase
      .from("calendario_bloqueos")
      .select("*")
      .eq("hospedaje_id", hospedajeId)
      .or(
        `and(fecha_inicio.lte.${fechaInicio.toISOString()},fecha_fin.gte.${fechaInicio.toISOString()}),` +
          `and(fecha_inicio.lte.${fechaFin.toISOString()},fecha_fin.gte.${fechaFin.toISOString()})`,
      );

    if (error) throw error;

    return data.length === 0; // true si está disponible
  }
}
```

```typescript
// src/services/supabase/ventas.service.ts
import { supabase } from "./client";
import type { Database } from "./types";

type PropiedadVenta = Database["public"]["Tables"]["propiedades_venta"]["Row"];

export class VentasService {
  /**
   * Obtener propiedades disponibles
   */
  static async getAvailable() {
    const { data, error } = await supabase
      .from("propiedades_venta")
      .select(
        `
        *,
        imagenes:propiedades_venta_imagenes(*),
        amenidades:propiedad_amenidades(amenidad:amenidades(*))
      `,
      )
      .eq("activo", true)
      .eq("estado", "disponible")
      .order("creado_en", { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Registrar interés en propiedad
   */
  static async registerInterest(data: {
    propiedad_venta_id: string;
    usuario_id: string;
    notas?: string;
  }) {
    const { data: interest, error } = await supabase
      .from("reserva_propiedad_venta")
      .insert({
        ...data,
        estado: "interesado",
      })
      .select()
      .single();

    if (error) throw error;
    return interest;
  }
}
```

```typescript
// src/services/supabase/calendar.service.ts
import ical from "ical";
import { supabase } from "./client";

export class CalendarService {
  /**
   * Sincronizar calendario iCal
   */
  static async syncIcal(calendarioId: string, icalUrl: string) {
    try {
      // 1. Descargar y parsear iCal
      const response = await fetch(icalUrl);
      const icalData = await response.text();
      const events = ical.parseICS(icalData);

      // 2. Extraer bloqueos
      const bloqueos = Object.values(events)
        .filter((event) => event.type === "VEVENT")
        .map((event) => ({
          fecha_inicio: new Date(event.start).toISOString().split("T")[0],
          fecha_fin: new Date(event.end).toISOString().split("T")[0],
          referencia_externa: event.uid,
        }));

      // 3. Obtener calendario para hospedaje_id
      const { data: calendario } = await supabase
        .from("hospedaje_calendarios")
        .select("hospedaje_id, plataforma")
        .eq("id", calendarioId)
        .single();

      if (!calendario) throw new Error("Calendario no encontrado");

      // 4. Eliminar bloqueos antiguos de esta fuente
      await supabase
        .from("calendario_bloqueos")
        .delete()
        .eq("hospedaje_calendario_id", calendarioId);

      // 5. Insertar nuevos bloqueos
      const { error } = await supabase.from("calendario_bloqueos").insert(
        bloqueos.map((b) => ({
          ...b,
          hospedaje_id: calendario.hospedaje_id,
          hospedaje_calendario_id: calendarioId,
          fuente: calendario.plataforma,
        })),
      );

      if (error) throw error;

      // 6. Actualizar timestamp de sincronización
      await supabase
        .from("hospedaje_calendarios")
        .update({ ultimo_sync: new Date().toISOString() })
        .eq("id", calendarioId);

      return { success: true, bloqueosImportados: bloqueos.length };
    } catch (error) {
      console.error("Error syncing iCal:", error);
      throw error;
    }
  }

  /**
   * Verificar disponibilidad considerando todos los calendarios
   */
  static async checkAvailability(
    hospedajeId: string,
    fechaInicio: string,
    fechaFin: string,
  ) {
    const { data, error } = await supabase
      .from("calendario_bloqueos")
      .select("*")
      .eq("hospedaje_id", hospedajeId)
      .or(
        `and(fecha_inicio.lte.${fechaInicio},fecha_fin.gte.${fechaInicio}),` +
          `and(fecha_inicio.lte.${fechaFin},fecha_fin.gte.${fechaFin}),` +
          `and(fecha_inicio.gte.${fechaInicio},fecha_fin.lte.${fechaFin})`,
      );

    if (error) throw error;

    return {
      disponible: data.length === 0,
      bloqueos: data,
    };
  }
}
```

### Configuración de Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});
```

### Configuración de Tailwind

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## 🎯 CONVENCIONES Y REGLAS DE DESARROLLO

### 1. **Estructura de Archivos**

#### Nombres de Archivos

```
- Componentes: PascalCase.tsx (Button.tsx, AccommodationCard.tsx)
- Utilidades: camelCase.ts (filters.ts, calendar.ts)
- Servicios: camelCase.service.ts (hospedajes.service.ts)
- Tipos: camelCase.ts o types.ts
- Hooks: use + PascalCase.ts (useHospedajes.ts)
- Páginas: PascalCase.tsx (Page.tsx, AccommodationDetail.tsx)
```

#### Organización de Imports

```typescript
// 1. React y librerías externas
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 2. Servicios y utilidades
import { supabase } from "@/services/supabase/client";
import { HospedajesService } from "@/services/supabase/hospedajes.service";

// 3. Componentes
import { Button } from "@/shared/components/Button";
import { AccommodationCard } from "../components/AccommodationCard";

// 4. Hooks personalizados
import { useHospedajes } from "../hooks/useHospedajes";

// 5. Tipos
import type { Hospedaje } from "@/services/supabase/types";

// 6. Assets
import heroImage from "../assets/hero.jpg";
```

### 2. **TypeScript Estricto**

```typescript
// ❌ MAL: Usar any
function fetchData(id: any) {
  return supabase.from("hospedajes").select("*").eq("id", id);
}

// ✅ BIEN: Tipos explícitos
function fetchData(id: string): Promise<Hospedaje | null> {
  return supabase
    .from("hospedajes")
    .select("*")
    .eq("id", id)
    .single()
    .then(({ data }) => data);
}

// ✅ BIEN: Inferencia de tipos con Database
import type { Database } from "@/services/supabase/types";

type Hospedaje = Database["public"]["Tables"]["hospedajes"]["Row"];
type HospedajeInsert = Database["public"]["Tables"]["hospedajes"]["Insert"];
```

### 3. **Custom Hooks Pattern**

```typescript
// src/slices/accommodations/hooks/useHospedajes.ts
import { useState, useEffect } from "react";
import { HospedajesService } from "@/services/supabase/hospedajes.service";
import type { Hospedaje } from "@/services/supabase/types";

interface UseHospedajesOptions {
  filters?: {
    precioMin?: number;
    precioMax?: number;
    ubicacion?: string;
  };
}

export function useHospedajes(options?: UseHospedajesOptions) {
  const [data, setData] = useState<Hospedaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = options?.filters
          ? await HospedajesService.filterBy(options.filters)
          : await HospedajesService.getAll();

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(options?.filters)]);

  return { data, loading, error, refetch: () => fetchData() };
}
```

### 4. **Manejo de Errores**

```typescript
// ✅ BIEN: Try-catch con logging
async function createReserva(data: ReservaInput) {
  try {
    const { data: reserva, error } = await supabase
      .from("reservas_hospedaje")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    // Log de auditoría
    console.info("Reserva creada:", reserva.id);

    return { success: true, data: reserva };
  } catch (error) {
    console.error("Error creating reserva:", error);

    // Puedes integrar con servicio de logging (Sentry, etc.)
    // captureException(error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
```

### 5. **Componentes Reutilizables**

```typescript
// src/shared/components/Card.tsx
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  className?: string
  onClick?: () => void
}

export function Card({
  children,
  variant = 'default',
  className,
  onClick,
}: CardProps) {
  const variants = {
    default: 'bg-white shadow-sm',
    outlined: 'border-2 border-gray-200',
    elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow',
  }

  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variants[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
```

### 6. **Validaciones con Zod (Recomendado)**

```typescript
// src/slices/accommodations/utils/validations.ts
import { z } from "zod";

export const reservaSchema = z
  .object({
    hospedaje_id: z.string().uuid("ID de hospedaje inválido"),

    fecha_inicio: z.date({
      required_error: "Fecha de inicio requerida",
    }),

    fecha_fin: z.date({
      required_error: "Fecha de fin requerida",
    }),

    nombre: z
      .string()
      .min(2, "Nombre debe tener al menos 2 caracteres")
      .max(100),

    email: z.string().email("Email inválido").toLowerCase(),

    telefono: z
      .string()
      .regex(/^\+?[0-9]{8,15}$/, "Teléfono inválido")
      .optional(),
  })
  .refine((data) => data.fecha_fin > data.fecha_inicio, {
    message: "La fecha de fin debe ser posterior a la de inicio",
    path: ["fecha_fin"],
  });

export type ReservaInput = z.infer<typeof reservaSchema>;
```

### 7. **Optimización de Imágenes**

```typescript
// src/shared/utils/images.ts

/**
 * Genera URL optimizada para imágenes almacenadas
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    width?: number
    height?: number
    quality?: number
  }
): string {
  const { width = 800, height, quality = 80 } = options || {}

  // Si usas un CDN, agregar transformaciones
  // Ejemplo con Cloudinary:
  // return url.replace('/upload/', `/upload/w_${width},q_${quality}/`)

  // Por ahora retorna URL original
  return url
}

/**
 * Componente de imagen optimizada
 */
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  return (
    <img
      src={getOptimizedImageUrl(src, { width, height })}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}
```

---

## 🚀 FLUJOS DE TRABAJO PRINCIPALES

### 1. Listar Hospedajes con Filtros

```typescript
// src/slices/accommodations/Page.tsx
import { useState } from 'react'
import { useHospedajes } from './hooks/useHospedajes'
import { AccommodationCard } from './components/AccommodationCard'
import { FilterBar } from './components/FilterBar'

export default function AccommodationsPage() {
  const [filters, setFilters] = useState({
    precioMin: 0,
    precioMax: 500,
    ubicacion: '',
    tipo: '',
  })

  const { data: hospedajes, loading, error } = useHospedajes({ filters })

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Hospedajes Disponibles</h1>

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {hospedajes.map((hospedaje) => (
          <AccommodationCard key={hospedaje.id} data={hospedaje} />
        ))}
      </div>
    </div>
  )
}
```

### 2. Crear Reserva con Validación

```typescript
// src/slices/accommodations/hooks/useBooking.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase/client";
import { CalendarService } from "@/services/supabase/calendar.service";
import { reservaSchema, type ReservaInput } from "../utils/validations";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createBooking = async (data: ReservaInput) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Validar datos
      const validated = reservaSchema.parse(data);

      // 2. Verificar disponibilidad
      const { disponible } = await CalendarService.checkAvailability(
        validated.hospedaje_id,
        validated.fecha_inicio.toISOString().split("T")[0],
        validated.fecha_fin.toISOString().split("T")[0],
      );

      if (!disponible) {
        throw new Error("Las fechas seleccionadas no están disponibles");
      }

      // 3. Crear reserva
      const { data: reserva, error: reservaError } = await supabase
        .from("reservas_hospedaje")
        .insert({
          hospedaje_id: validated.hospedaje_id,
          usuario_id: (await supabase.auth.getUser()).data.user?.id,
          fecha_inicio: validated.fecha_inicio.toISOString().split("T")[0],
          fecha_fin: validated.fecha_fin.toISOString().split("T")[0],
          estado: "pendiente",
        })
        .select()
        .single();

      if (reservaError) throw reservaError;

      // 4. Crear bloqueo interno
      await supabase.from("calendario_bloqueos").insert({
        hospedaje_id: validated.hospedaje_id,
        fecha_inicio: validated.fecha_inicio.toISOString().split("T")[0],
        fecha_fin: validated.fecha_fin.toISOString().split("T")[0],
        fuente: "internal",
        referencia_externa: reserva.id,
      });

      // 5. Navegar a confirmación
      navigate(`/reservas/${reserva.id}/confirmacion`);

      return { success: true, data: reserva };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al crear reserva";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
}
```

### 3. Sincronización de Calendarios iCal

```typescript
// src/services/supabase/calendar.service.ts
import ical from "ical";
import { supabase } from "./client";

export class CalendarService {
  /**
   * Sincronizar todos los calendarios activos de un hospedaje
   */
  static async syncAllCalendars(hospedajeId: string) {
    try {
      // 1. Obtener calendarios activos
      const { data: calendarios, error } = await supabase
        .from("hospedaje_calendarios")
        .select("*")
        .eq("hospedaje_id", hospedajeId)
        .eq("activo", true);

      if (error) throw error;

      // 2. Sincronizar cada calendario
      const resultados = await Promise.all(
        calendarios.map((cal) => this.syncIcal(cal.id, cal.ical_url)),
      );

      const totalBloqueos = resultados.reduce(
        (sum, r) => sum + r.bloqueosImportados,
        0,
      );

      return {
        success: true,
        calendariosSincronizados: calendarios.length,
        totalBloqueos,
      };
    } catch (error) {
      console.error("Error syncing calendars:", error);
      throw error;
    }
  }

  /**
   * Sincronizar un calendario específico
   */
  static async syncIcal(calendarioId: string, icalUrl: string) {
    try {
      // 1. Descargar y parsear iCal
      const response = await fetch(icalUrl);
      const icalData = await response.text();
      const events = ical.parseICS(icalData);

      // 2. Extraer eventos tipo VEVENT (bloqueos)
      const bloqueos = Object.values(events)
        .filter((event) => event.type === "VEVENT")
        .map((event) => ({
          fecha_inicio: new Date(event.start).toISOString().split("T")[0],
          fecha_fin: new Date(event.end).toISOString().split("T")[0],
          referencia_externa: event.uid,
        }));

      // 3. Obtener info del calendario
      const { data: calendario } = await supabase
        .from("hospedaje_calendarios")
        .select("hospedaje_id, plataforma")
        .eq("id", calendarioId)
        .single();

      if (!calendario) throw new Error("Calendario no encontrado");

      // 4. Eliminar bloqueos antiguos de esta fuente
      await supabase
        .from("calendario_bloqueos")
        .delete()
        .eq("hospedaje_calendario_id", calendarioId);

      // 5. Insertar nuevos bloqueos
      if (bloqueos.length > 0) {
        const { error: insertError } = await supabase
          .from("calendario_bloqueos")
          .insert(
            bloqueos.map((b) => ({
              ...b,
              hospedaje_id: calendario.hospedaje_id,
              hospedaje_calendario_id: calendarioId,
              fuente: calendario.plataforma,
            })),
          );

        if (insertError) throw insertError;
      }

      // 6. Actualizar timestamp
      await supabase
        .from("hospedaje_calendarios")
        .update({ ultimo_sync: new Date().toISOString() })
        .eq("id", calendarioId);

      return { success: true, bloqueosImportados: bloqueos.length };
    } catch (error) {
      console.error(`Error syncing calendar ${calendarioId}:`, error);
      throw error;
    }
  }
}
```

### 4. Filtrar Propiedades en Venta

```typescript
// src/slices/sales/hooks/useProperties.ts
import { useState, useEffect } from "react";
import { VentasService } from "@/services/supabase/ventas.service";

interface UsePropertiesFilters {
  precioMin?: number;
  precioMax?: number;
  habitaciones?: number;
  ubicacion?: string;
  estado?: "disponible" | "reservada" | "vendida";
}

export function useProperties(filters?: UsePropertiesFilters) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const properties = await VentasService.filterBy(filters);
        setData(properties);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}
```

---

## 📊 PRIORIDADES Y MEJORES PRÁCTICAS

### Performance

- ✅ Lazy loading de imágenes (`loading="lazy"`)
- ✅ Code splitting por rutas (React.lazy + Suspense)
- ✅ Memoización de componentes pesados (React.memo)
- ✅ Debounce en búsquedas y filtros
- ✅ Paginación o infinite scroll en listados
- ✅ Índices en columnas frecuentemente filtradas (Supabase)
- ✅ Caché de consultas frecuentes

### Seguridad

- ✅ Row Level Security (RLS) en todas las tablas sensibles
- ✅ Validación de datos en cliente y servidor (Zod)
- ✅ Sanitización de inputs de usuario
- ✅ HTTPS en producción
- ✅ Variables de entorno no expuestas en cliente
- ✅ Auditoría de intentos de login
- ✅ Rate limiting en APIs (a implementar)

### Accesibilidad

- ✅ Etiquetas ARIA en elementos interactivos
- ✅ Foco visible en navegación por teclado
- ✅ Contraste de colores AA o superior
- ✅ Textos alternativos en imágenes
- ✅ Formularios con labels asociados

### SEO (Mejoras futuras con SSR/SSG)

- 📝 Meta tags dinámicos por página
- 📝 Structured data (JSON-LD) para propiedades
- 📝 Sitemap.xml generado dinámicamente
- 📝 Canonical URLs
- 📝 Open Graph para redes sociales

---

## 🛠️ HERRAMIENTAS Y COMANDOS

### Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev                # Vite dev server en localhost:5173

# Build
npm run build              # Build para producción
npm run preview            # Preview del build

# Linting (cuando se configure)
npm run lint               # Check linting
npm run lint:fix           # Fix linting issues

# Type checking
npm run type-check         # TypeScript validation

# Testing (cuando se configure)
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Scripts Útiles de Supabase

```bash
# Generar tipos de TypeScript desde Supabase
npx supabase gen types typescript --project-id "your-project-id" > src/services/supabase/types.ts

# Sincronizar esquema local con remoto (si usas Supabase CLI)
supabase db pull
supabase db push

# Crear migración
supabase migration new nombre_de_migracion
```

---

## 🔄 PLAN DE MIGRACIÓN: Firebase → Supabase

### Fase 1: Preparación (Actual)

- [x] Configurar proyecto Supabase
- [x] Crear esquema de base de datos
- [x] Aplicar migraciones iniciales
- [x] Configurar RLS policies
- [x] Crear índices de optimización

### Fase 2: Desarrollo de Servicios

- [ ] Crear servicios de Supabase (hospedajes, ventas, reservas)
- [ ] Implementar validaciones con Zod
- [ ] Migrar autenticación a Supabase Auth
- [ ] Crear hooks personalizados
- [ ] Testing de servicios

### Fase 3: Integración Frontend

- [ ] Reemplazar llamadas de Firebase por Supabase
- [ ] Actualizar componentes con nuevos hooks
- [ ] Migrar sistema de autenticación
- [ ] Testing de integración

### Fase 4: Testing y Optimización

- [ ] Tests E2E completos
- [ ] Optimización de queries
- [ ] Implementar caché donde sea necesario
- [ ] Performance testing
- [ ] Security audit

### Fase 5: Deployment

- [ ] Deploy a staging
- [ ] QA completo
- [ ] Migración de datos (si hay)
- [ ] Deploy a producción
- [ ] Monitoreo post-deploy

---

## 📝 NOTAS IMPORTANTES

### Contenido Estático en HTML

- Hero sections, footers, y contenido informativo permanecerán en el código HTML
- NO se usará Supabase para contenido estático del sitio
- Solo datos dinámicos (propiedades, reservas, usuarios) van a Supabase

### Autenticación

- Migrar de Firebase Auth a Supabase Auth
- Mantener sesiones persistentes
- Implementar refresh tokens automáticos
- Roles: `admin` y `editor` en tabla `admin_users`

### Calendarios iCal

- Soportar múltiples plataformas por hospedaje
- Sincronización manual y/o automática (cron)
- Consolidar bloqueos de todas las fuentes
- Manejo de conflictos: prioridad a reservas internas

### Imágenes

- URLs absolutas almacenadas en BD
- Implementar CDN para optimización (Cloudinary recomendado)
- Lazy loading obligatorio
- Formatos modernos (WebP/AVIF) cuando sea posible

---

## 🎯 CHECKLIST ANTES DE COMMIT

- [ ] Código TypeScript sin errores
- [ ] Sin console.logs innecesarios
- [ ] Imports organizados correctamente
- [ ] Componentes documentados con comentarios
- [ ] Validaciones implementadas (Zod)
- [ ] Manejo de errores con try-catch
- [ ] Loading states en peticiones asíncronas
- [ ] RLS policies verificadas
- [ ] Índices creados para queries frecuentes
- [ ] Variables de entorno documentadas en .env.example
- [ ] README actualizado si hay cambios arquitectónicos

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0  
**Mantenedor**: Equipo RentMe
