import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/services/firebase'
import type { CrearReservaHospedaje } from '../type'
import { toast } from 'sonner'
import { crearReservaHospedaje } from '../api/reservaHospedajeService' // Agregar esta importación

interface UseReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  maxGuests: number
  // Remover onSubmit ya que ya no lo necesitamos
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  fechaCheckIn: string
  fechaCheckOut: string
  numeroHuespedes: number
  mensaje: string
}

export const useAccomodationForm = ({ 
  accommodationId, 
  accommodationName, 
  pricePerNight,
  maxGuests
  // Remover onSubmit del destructuring
}: UseReservationFormProps) => {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    fechaCheckIn: '',
    fechaCheckOut: '',
    numeroHuespedes: 1,
    mensaje: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPending, setIsPending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [googleUser, setGoogleUser] = useState<any>(null)

  // ... todas las funciones existentes permanecen igual ...
  // calculateNights, calculateTotalPrice, formatPrice, getGuestOptions, etc.

  // Calcular número de noches
  const calculateNights = () => {
    if (!form.fechaCheckIn || !form.fechaCheckOut) return 0
    
    const checkIn = new Date(form.fechaCheckIn)
    const checkOut = new Date(form.fechaCheckOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    return nights > 0 ? nights : 0
  }

  // Calcular precio total
  const calculateTotalPrice = () => {
    const nights = calculateNights()
    return nights > 0 ? nights * pricePerNight : 0
  }

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Generar opciones de huéspedes basado en la capacidad máxima
  const getGuestOptions = () => {
    const options = []
    for (let i = 1; i <= maxGuests; i++) {
      options.push(i)
    }
    return options
  }

  // ... handleGoogleLogin, handleCancel, handleChange, validateForm permanecen igual ...

  // Manejar login con Google - AUTENTICACIÓN REAL
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setErrors(prev => ({ ...prev, google: '' }))
    
    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, provider)
      const userData = result.user

      const normalizedUser = {
        uid: userData.uid,
        displayName: userData.displayName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        photoURL: userData.photoURL || ''
      }

      setGoogleUser(normalizedUser)
      setUser(normalizedUser)

      setForm(prev => ({
        ...prev,
        nombre: normalizedUser.displayName || '',
        email: normalizedUser.email || '',
        telefono: normalizedUser.phoneNumber || prev.telefono
      }))

      setErrors(prev => ({
        ...prev,
        nombre: normalizedUser.displayName ? '' : prev.nombre,
        email: normalizedUser.email ? '' : prev.email,
        google: ''
      }))

      toast.success('¡Conectado con Google!', {
        description: `Bienvenido ${normalizedUser.displayName || normalizedUser.email}`,
        duration: 3000,
      })

    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error)
      
      let errorMessage = 'Error al conectar con Google'
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Ventana de autenticación cerrada'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Popup bloqueado por el navegador'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Autenticación cancelada'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Verifica tu internet'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Intenta más tarde'
          break
        default:
          errorMessage = error.message || 'Error al conectar con Google'
      }
      
      setErrors(prev => ({ ...prev, google: errorMessage }))
      toast.error('Error de autenticación', {
        description: errorMessage,
        duration: 4000,
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  // Manejar cancelación/limpieza
  const handleCancel = () => {
    setForm({
      nombre: '',
      email: '',
      telefono: '',
      fechaCheckIn: '',
      fechaCheckOut: '',
      numeroHuespedes: 1,
      mensaje: ''
    })
    setErrors({})
    setUser(null)
    setGoogleUser(null)
    
    toast.info('Formulario limpiado', {
      description: 'Todos los campos han sido reseteados',
      duration: 2000,
    })
  }

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'numeroHuespedes') {
      const numValue = parseInt(value)
      if (numValue > maxGuests) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: `El máximo de huéspedes permitido es ${maxGuests}` 
        }))
        return
      }
      if (numValue < 1) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: 'Debe ser al menos 1 huésped' 
        }))
        return
      }
    }
    
    setForm(prev => ({
      ...prev,
      [name]: name === 'numeroHuespedes' ? parseInt(value) : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
    if (!form.fechaCheckIn) newErrors.fechaCheckIn = 'La fecha de check-in es requerida'
    if (!form.fechaCheckOut) newErrors.fechaCheckOut = 'La fecha de check-out es requerida'
    
    if (form.numeroHuespedes < 1) {
      newErrors.numeroHuespedes = 'Debe ser al menos 1 huésped'
    } else if (form.numeroHuespedes > maxGuests) {
      newErrors.numeroHuespedes = `El máximo de huéspedes permitido es ${maxGuests}`
    }

    if (form.fechaCheckIn && form.fechaCheckOut) {
      const checkIn = new Date(form.fechaCheckIn)
      const checkOut = new Date(form.fechaCheckOut)
      if (checkOut <= checkIn) {
        newErrors.fechaCheckOut = 'La fecha de check-out debe ser después del check-in'
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (form.fechaCheckIn && new Date(form.fechaCheckIn) < today) {
      newErrors.fechaCheckIn = 'La fecha de check-in debe ser hoy o en el futuro'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // NUEVA FUNCIÓN: Manejar envío del formulario usando createReservation directamente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Formulario incompleto', {
        description: 'Por favor completa todos los campos requeridos',
        duration: 3000,
      })
      return
    }

    setIsPending(true)

    // Toast de carga
    const loadingToast = toast.loading('Creando reserva...', {
      description: 'Procesando tu solicitud de reserva',
    })

    try {
      // Preparar datos de la reserva
      const reservationData: CrearReservaHospedaje = {
        hospedajeId: accommodationId,
        hospedajeNombre: accommodationName,
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        fechaCheckIn: new Date(form.fechaCheckIn),
        fechaCheckOut: new Date(form.fechaCheckOut),
        numeroHuespedes: form.numeroHuespedes,
        mensaje: form.mensaje,
        ...(googleUser && { 
          googleUserId: googleUser.uid,
          googleUserData: googleUser 
        })
      }

      // Crear la reserva directamente usando el servicio
      console.log('Creando reserva en Firebase...', reservationData)
      const newReservationId = await crearReservaHospedaje(reservationData, pricePerNight)
      
      console.log('Reserva creada con ID:', newReservationId)

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      // Toast de éxito con estilo verde personalizado
      toast.success('¡Reserva creada exitosamente!', {
        description: `Tu reserva ha sido registrada. ID: ${newReservationId}`,
        duration: 5000,
        style: {
          backgroundColor: '#52655B',
          color: 'white',
          border: '1px solid #52655B',
        },
        className: 'text-white',
        action: {
          label: 'Copiar ID',
          onClick: () => {
            navigator.clipboard.writeText(newReservationId)
            toast.success('ID copiado al portapapeles', {
              duration: 2000,
            })
          },
        },
      })

      setIsSubmitted(true)

    } catch (error: any) {
      console.error('Error al crear la reserva:', error)
      
      toast.dismiss(loadingToast)
      
      const errorMessage = error.message || 'Error al crear la reserva'
      
      toast.error('Error al crear la reserva', {
        description: errorMessage,
        duration: 5000,
        action: {
          label: 'Reintentar',
          onClick: () => {
            handleSubmit(e)
          },
        },
      })
      
      setErrors({ submit: 'Error al enviar la reserva. Intenta nuevamente.' })
    } finally {
      setIsPending(false)
    }
  }

  // Resetear formulario
  const resetForm = () => {
    setForm({
      nombre: '',
      email: '',
      telefono: '',
      fechaCheckIn: '',
      fechaCheckOut: '',
      numeroHuespedes: 1,
      mensaje: ''
    })
    setErrors({})
    setIsPending(false)
    setIsSubmitted(false)
    setUser(null)
    setGoogleUser(null)
  }

  // Valores calculados
  const nights = calculateNights()
  const totalPrice = calculateTotalPrice()

  return {
    // Estado del formulario
    form,
    errors,
    isPending,
    isSubmitted,
    googleLoading,
    user,
    googleUser,
    
    // Valores calculados
    nights,
    totalPrice,
    maxGuests,
    
    // Funciones
    handleChange,
    handleSubmit, // Esta función ahora usa createReservation directamente
    handleGoogleLogin,
    handleCancel,
    resetForm,
    formatPrice,
    getGuestOptions,
    
    // Validaciones
    isFormValid: nights > 0 && Object.keys(errors).length === 0,
  }
}