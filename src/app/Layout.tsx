import { Outlet } from '@tanstack/react-router'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SocialBar from '@/components/layout/SocialBar'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="hidden md:block">
        <SocialBar />
      </div>
      
      <main className="flex-1">
        <Outlet /> 
      </main>
      
      <Footer/>
    </div>
  )
}

export default Layout

