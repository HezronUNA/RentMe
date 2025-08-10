import { Link } from "@tanstack/react-router"


const Header = () => {
  return (
          <nav className="border-b">
        <div className="container mx-auto flex gap-4 py-3">
          <Link to="/">Inicio</Link>
          <Link to="/nosotros">Sobre Nosotros</Link>
        </div>
      </nav>
  )
}

export default Header
