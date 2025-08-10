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

// Ruta raíz con layout
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Cargando...</div>}>
      <AppLayout />
    </Suspense>
  )
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

// Árbol de rutas
const routeTree = rootRoute.addChildren([
  homeRoute,
  nosotrosRoute
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
