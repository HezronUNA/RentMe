import {  Outlet } from '@tanstack/react-router'
import Header from '../shared/components/Header'
import Footer from '../shared/components/Footer'
import SocialBar from '@/shared/components/SocialBar'

const Layout = () => {
  return (
   <div className="min-h-screen flex flex-col">
      <Header />
      <SocialBar />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default Layout
