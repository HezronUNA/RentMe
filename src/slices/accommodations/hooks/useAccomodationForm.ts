import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/services/firebase'
import type { CrearReservaHospedaje } from '../type'
import { toast } from 'sonner'

interface UseReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  maxGuests: number
  onSubmit: (reservationData: CrearReservaHospedaje) => Promise<void>
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
  maxGuests,
  onSubmit 
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

  // Manejar login con Google - AUTENTICACIÓN REAL
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setErrors(prev => ({ ...prev, google: '' })) // Limpiar errores previos
    
    try {
      // Configurar el proveedor de Google
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      
      // Configuraciones adicionales del proveedor
      provider.setCustomParameters({
        prompt: 'select_account' // Forzar selección de cuenta
      })

      // Realizar la autenticación con popup
      const result = await signInWithPopup(auth, provider)
      const userData = result.user

      console.log('Usuario autenticado:', userData)

      // Crear objeto de usuario normalizado
      const normalizedUser = {
        uid: userData.uid,
        displayName: userData.displayName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        photoURL: userData.photoURL || ''
      }

      setGoogleUser(normalizedUser)
      setUser(normalizedUser)

      // Prellenar formulario con datos de Google
      setForm(prev => ({
        ...prev,
        nombre: normalizedUser.displayName || '',
        email: normalizedUser.email || '',
        telefono: normalizedUser.phoneNumber || prev.telefono // Mantener teléfono anterior si Google no lo tiene
      }))

      // Limpiar errores relacionados con los campos prellenados
      setErrors(prev => ({
        ...prev,
        nombre: normalizedUser.displayName ? '' : prev.nombre,
        email: normalizedUser.email ? '' : prev.email,
        google: ''
      }))

      console.log('Formulario prellenado con datos de Google')

    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error)
      
      // Manejar diferentes tipos de errores
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
    
    // Opcional: cerrar sesión de Firebase también
    // auth.signOut()
  }

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Validación especial para número de huéspedes
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
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validaciones básicas
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
    if (!form.fechaCheckIn) newErrors.fechaCheckIn = 'La fecha de check-in es requerida'
    if (!form.fechaCheckOut) newErrors.fechaCheckOut = 'La fecha de check-out es requerida'
    
    // Validación mejorada para número de huéspedes
    if (form.numeroHuespedes < 1) {
      newErrors.numeroHuespedes = 'Debe ser al menos 1 huésped'
    } else if (form.numeroHuespedes > maxGuests) {
      newErrors.numeroHuespedes = `El máximo de huéspedes permitido es ${maxGuests}`
    }

    // Validar que la fecha de check-out sea después del check-in
    if (form.fechaCheckIn && form.fechaCheckOut) {
      const checkIn = new Date(form.fechaCheckIn)
      const checkOut = new Date(form.fechaCheckOut)
      if (checkOut <= checkIn) {
        newErrors.fechaCheckOut = 'La fecha de check-out debe ser después del check-in'
      }
    }

    // Validar que las fechas sean futuras
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (form.fechaCheckIn && new Date(form.fechaCheckIn) < today) {
      newErrors.fechaCheckIn = 'La fecha de check-in debe ser hoy o en el futuro'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

// ...existing code...

  // Manejar envío del formulario
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
    const loadingToast = toast.loading('Enviando reserva...', {
      description: 'Por favor espera mientras procesamos tu solicitud',
    })

    try {
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

      await onSubmit(reservationData)

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      // Toast de éxito con estilo verde personalizado
      toast.success('¡Reserva enviada exitosamente!', {
        description: `Tu reserva para ${accommodationName} ha sido procesada. Te contactaremos pronto.`,
        duration: 5000,
        style: {
          backgroundColor: '#52655B', // Verde emerald-500
          color: 'white',
          border: '1px solid #52655B', // Verde emerald-600 para el borde
        }
      })

      setIsSubmitted(true)

    } catch (error: any) {
      console.error('Error al crear la reserva:', error)
      
      // Dismiss loading toast
      toast.dismiss(loadingToast)
      
      // Toast de error
      toast.error('Error al enviar la reserva', {
        description: error.message || 'Hubo un problema al procesar tu reserva. Por favor intenta nuevamente.',
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
    handleSubmit,
    handleGoogleLogin,
    handleCancel,
    resetForm,
    formatPrice,
    getGuestOptions,
    
    // Validaciones
    isFormValid: nights > 0 && Object.keys(errors).length === 0,
  }
}