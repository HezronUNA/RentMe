import { Outlet, useLocation } from '@tanstack/react-router'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const Layout = () => {
  const location = useLocation()
  
  // Ocultar header en rutas de detalle de alojamientos y ventas
  const isDetailPage = location.pathname.includes('/alojamientos/') || location.pathname.includes('/ventas/')
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header solo se muestra si NO estamos en detalle */}
      {!isDetailPage && <Header />}
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer/>
    </div>
  )
}

export default Layout

