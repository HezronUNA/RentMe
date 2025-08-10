import {  Outlet } from '@tanstack/react-router'
import Header from '../shared/components/Header'
import Footer from '../shared/components/Footer'

const Layout = () => {
  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-6">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default Layout
