import { 
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  lazyRouteComponent,
} from '@tanstack/react-router'
import { Suspense } from 'react'
import AppLayout from './Layout'
import ScrollToTop from '@/components/ui/ScrollToTop'

import NotFoundPage from '../app/NotFoundPage'

const HomePage = lazyRouteComponent(() => import('../pages/Index'))
const AboutUsPage = lazyRouteComponent(() => import('../pages/AboutUsPage'))
const TermsAndConditionsPage = lazyRouteComponent(() => import('../pages/TermsAndConditionsPage'))
const ToursPage = lazyRouteComponent(() => import('../pages/ToursPage'))
const AdminPage = lazyRouteComponent(() => import('../pages/AdminPage'))
const AccommodationsPage = lazyRouteComponent(() => import('../slices/accommodations/Page'))
const SalesPage = lazyRouteComponent(() => import('../slices/sales/Page'))
const ServicesPage = lazyRouteComponent(() => import('../pages/ServicesPage'))
const ServiceReservationPage = lazyRouteComponent(() => import('../pages/ServiceReservationPage'))
const SaleDetailPage = lazyRouteComponent(() => import('../slices/sales/SaleDetail'))
const AccommodationDetailPage = lazyRouteComponent(() => import('../slices/accommodations/AccommodationDetail'))
const PlansReservationPage = lazyRouteComponent(() => import('../pages/PlansReservationPage'))
const GuiaAlojamientosCostaRicaPage = lazyRouteComponent(() => import('../pages/GuiaAlojamientosCostaRicaPage'))

// Ruta raíz con layout
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={
      <div style={{
        minHeight: '100dvh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: '3px solid #e7eee9',
          borderTopColor: '#52655B',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    }>
      <ScrollToTop />
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

const termsAndConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terminos-y-condiciones',
  component: TermsAndConditionsPage
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

const toursRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tours",
  component: ToursPage,
})
        
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/administracion",
  component: AdminPage,
  })
  
const reservarServicioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservar-servicio",
  component: ServiceReservationPage,
})

const reservarPlanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservar-plan",
  component: PlansReservationPage,
})

const guiaAlojamientosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/guia-alojamientos-costa-rica",
  component: GuiaAlojamientosCostaRicaPage,
})

// Árbol de rutas
const routeTree = rootRoute.addChildren([
  homeRoute,
  nosotrosRoute,
  termsAndConditionsRoute,
  toursRoute,
  alojamientosRoute,
  alojamientoDetailRoute,
  ventasRoute,
  ventaDetailRoute,
  serviciosRoute,
  adminRoute,
  reservarServicioRoute,
  reservarPlanRoute,
  guiaAlojamientosRoute,
])

// Configuración del router
// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({ routeTree })

// Tipado opcional
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Proveedor del router
export function AppRouterProvider() {
  return (
    <RouterProvider router={router} />
  )
}


