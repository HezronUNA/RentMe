import { Link } from '@tanstack/react-router'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="bg-white/80 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mb-4 animate-bounce">
            <circle cx="12" cy="12" r="10" fill="#3B82F6" opacity="0.15" />
            <path d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.8807 13.3807 12 12 12C10.6193 12 9.5 10.8807 9.5 9.5Z" fill="#3B82F6" />
            <rect x="9" y="15" width="6" height="2" rx="1" fill="#3B82F6" />
          </svg>
          <h1 className="text-7xl font-extrabold text-blue-600 mb-2 drop-shadow-lg">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">¡Ups! Página no encontrada</h2>
          <p className="text-gray-500 mb-4">
            La página que buscas no existe, fue movida o nunca estuvo aquí.
          </p>
        </div>
        <Link 
          to="/" 
          className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Volver al inicio
        </Link>
        <div className="mt-6">
          <Link 
            to="/nosotros" 
            className="text-blue-500 hover:text-pink-500 underline font-medium"
          >
            Conoce más sobre nosotros
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

