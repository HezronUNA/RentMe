import { 
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider
} from '@tanstack/react-router'
import AppLayout from './Layout'
import ScrollToTop from '@/components/ui/ScrollToTop'

// Importación estática de las páginas (se cargan con el bundle)
import HomePage from '../pages/Index'
import AboutUsPage from '../pages/AboutUsPage'
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage'
import ToursPage from '../pages/ToursPage'
import AdminPage from '../pages/AdminPage'
import NotFoundPage from '../app/NotFoundPage'
import AccommodationsPage from "../slices/accommodations/Page"
import SalesPage from "../slices/sales/Page"
import ServicesPage from "../pages/ServicesPage"
import ServiceReservationPage from "../pages/ServiceReservationPage"
import SaleDetailPage from "../slices/sales/SaleDetail"
import AccommodationDetailPage from "../slices/accommodations/AccommodationDetail"
import PlansReservationPage from "../pages/PlansReservationPage"

// Ruta raíz con layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <ScrollToTop />
      <AppLayout />
    </>
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
  reservarPlanRoute
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


