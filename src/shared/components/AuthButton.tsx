import { Button } from './Button'
import { FcGoogle } from "react-icons/fc"
import { useAuth } from '@/app/AuthProvider'
import { useState } from 'react'
import { toast } from 'sonner'

interface AuthButtonProps {
  className?: string
  showSwitchOption?: boolean
}

export function AuthButton({ className = "", showSwitchOption = true }: AuthButtonProps) {
  const { user, signInWithGoogle, signOut, switchGoogleAccount } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast.success("¡Sesión iniciada correctamente!")
    } catch (error) {
      console.error('Error signing in:', error)
      toast.error("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchAccount = async () => {
    setLoading(true)
    try {
      await switchGoogleAccount()
      toast.success("¡Cuenta cambiada correctamente!")
    } catch (error) {
      console.error('Error switching account:', error)
      toast.error("Error al cambiar de cuenta")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Sesión cerrada correctamente")
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error("Error al cerrar sesión")
    }
  }

  if (user) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md border">
          <span className="font-medium">Conectado como: </span>
          {user.email}
        </div>
        
        <div className="flex gap-2">
          {showSwitchOption && (
            <Button
              type="button"
              variant="white"
              className="flex items-center gap-2 border border-gray-300"
              onClick={handleSwitchAccount}
              disabled={loading}
            >
              <FcGoogle size={18} />
              {loading ? "Cambiando..." : "Cambiar cuenta"}
            </Button>
          )}
          
          <Button
            type="button"
            variant="white"
            className="border border-gray-300"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      type="button"
      variant="white"
      className={`flex items-center justify-center gap-2 border border-gray-300 ${className}`}
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      <FcGoogle size={18} />
      {loading ? "Iniciando sesión..." : "Iniciar con Google"}
    </Button>
  )
}