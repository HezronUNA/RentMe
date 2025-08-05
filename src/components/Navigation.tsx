import { Link } from '@tanstack/react-router'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary-600 hover:text-primary-700"
            >
              🏠 RentMe
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Inicio
            </Link>
            <Link 
              to="/ventas" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Ventas
            </Link>
            <Link 
              to="/servicios" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Servicios
            </Link>
            <Link 
              to="/alojamientos/huesped" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Huésped
            </Link>
            <Link 
              to="/alojamientos/propietario" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Propietario
            </Link>
            <Link 
              to="/sobre-nosotros" 
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeProps={{
                className: "text-primary-600 bg-primary-50"
              }}
            >
              Sobre Nosotros
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
