import { lazy, Suspense } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider
} from '@tanstack/react-router'
import AppLayout from './Layout'

// Importación diferida (lazy) de las páginas
const HomePage = lazy(() => import('../slices/home/Page'))
const AboutUsPage = lazy(() => import('../slices/aboutUs/Page'))
const NotFoundPage = lazy(() => import('../app/NotFoundPage'))
const AccommodationsPage = lazy(() => import("../slices/accommodations/Page"))
const SalesPage = lazy(() => import("../slices/sales/Page"))
const ServicesPage = lazy(() => import("../slices/services/Page"))
const ServiceDetailPage = lazy(() => import("../slices/services/ServiceDetailPage"))
const SaleDetailPage = lazy(() => import("../slices/sales/SaleDetail"))
const AccommodationDetailPage = lazy(() => import("../slices/accommodations/AccommodationDetail"))

// Ruta raíz con layout
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Cargando...</div>}>
      <AppLayout />
    </Suspense>
  ),
  notFoundComponent: NotFoundPage
})

// Rutas hijas
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
})

const nosotrosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nosotros',
  component: AboutUsPage
})

const alojamientosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alojamientos",
  component: AccommodationsPage,
})

const alojamientoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alojamientos/$alojamientoId",
  component: AccommodationDetailPage
})

const ventasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ventas",
  component: SalesPage,
})

const ventaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ventas/$ventaId",
  component: SaleDetailPage
})

const serviciosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/servicios",
  component: ServicesPage,
})

const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/servicios/$modalidadId",
  component: ServiceDetailPage,
})

// Árbol de rutas
const routeTree = rootRoute.addChildren([
   homeRoute,
  nosotrosRoute,
  alojamientosRoute,
  alojamientoDetailRoute,
  ventasRoute,
  ventaDetailRoute,
  serviciosRoute,
  serviceDetailRoute
])

// Configuración del router
export const router = createRouter({ routeTree })

// Tipado opcional
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Proveedor del router
export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
