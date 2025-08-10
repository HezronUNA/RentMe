import {
  createRouter,
  createRootRoute,
  createRoute
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Layout from './components/Layout'
import Home from './pages/Home'
import Ventas from './pages/Ventas'
import SobreNosotros from './pages/SobreNosotros'
import Servicios from './pages/Servicios'
import Huesped from './pages/Alojamientos/Huesped'
import Propietario from './pages/Alojamientos/Propietario'

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout />
      <TanStackRouterDevtools />
    </>
  ),
})

// Subrutas
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const ventasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ventas',
  component: Ventas,
})

const sobreNosotrosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sobre-nosotros',
  component: SobreNosotros,
})

const serviciosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servicios',
  component: Servicios,
})

const huespedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/alojamientos/huesped',
  component: Huesped,
})

const propietarioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/alojamientos/propietario',
  component: Propietario,
})

// Agregar las rutas hijas al árbol
const routeTree = rootRoute.addChildren([
  indexRoute,
  ventasRoute,
  sobreNosotrosRoute,
  serviciosRoute,
  huespedRoute,
  propietarioRoute,
])

// Crear el router
export const router = createRouter({ routeTree })

// Declare the router context globally
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
