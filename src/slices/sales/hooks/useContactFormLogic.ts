import { useEffect, useState } from "react";
import { type User } from "firebase/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { signInWithGoogle, switchGoogleAccount } from "@/services/firebase/auth";
import { toast } from "sonner";
import { crearReservaVenta } from "../api/reservaVentaService";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
}

interface ContactFormErrors {
  nombre: string;
  email: string;
  telefono: string;
}

export function useContactFormLogic(propertyId: string, _propertyTitle?: string) {
  const user = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState<ContactFormData>({
    nombre: "",
    email: "",
    telefono: "",
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({
    nombre: "",
    email: "",
    telefono: "",
  });

  const handleDelete = () => {
    setGoogleUser(null);
    setForm(prev => ({ ...prev, email: "" }));
    setForm(prev => ({ ...prev, telefono: "" }));
    setForm(prev => ({ ...prev, nombre: "" }));
  }

  // Llenar datos del usuario si está autenticado
  useEffect(() => {
    if (user || googleUser) {
      const displayName = (user?.displayName || googleUser?.displayName) || "";
      
      setForm((prev) => ({
        ...prev,
        nombre: prev.nombre || displayName,
        email: (user?.email || googleUser?.email) || prev.email,
      }));
    }
  }, [user, googleUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let maxLength = 50;
    if (name === "telefono") maxLength = 15;
    if (name === "nombre") maxLength = 100;
    
    if (value.length > maxLength) return;
    
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: ContactFormErrors = {
      nombre: "",
      email: "",
      telefono: "",
    };

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio.";
      valid = false;
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio.";
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "El correo electrónico no es válido.";
      valid = false;
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
      valid = false;
    } else if (form.telefono.length < 8) {
      newErrors.telefono = "El teléfono debe tener al menos 8 caracteres.";
      valid = false;
    } else if (!/^\d{4}-?\d{4}$/.test(form.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = "El formato del teléfono debe ser 8888-8888.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setIsError(false);
    setError(null);
    
    if (!validateForm()) return;

    setIsPending(true);
    
    try {
      // Crear la reserva usando el service
      const reservaData = {
        propiedadId: propertyId,
        propiedadTitulo: _propertyTitle,
        nombre: form.nombre.trim(),
        email: (user?.email || googleUser?.email) || form.email.trim(),
        telefono: form.telefono.trim(),
        mensaje: `Interés en la propiedad. Contactar al cliente para más información.`,
        usuarioId: user?.uid || googleUser?.uid
      };

      const reservaId = await crearReservaVenta(reservaData);
      
      console.log('Reserva creada exitosamente:', reservaId);
      
      toast.success("¡Mensaje enviado correctamente!", {
        description: "Nos pondremos en contacto contigo pronto.",
        style: {
          background: "#22c55e",
          border: "1px solid #22c55e",
          color: "white",
        },
      });
      
      setIsSubmitted(true);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      const errorMessage = error?.message || "Error desconocido";
      setError(errorMessage);
      setIsError(true);
      
      toast.error("Error al enviar el formulario", {
        description: "Por favor intenta nuevamente.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    
    try {
      // Si ya hay un usuario autenticado, permitir cambiar de cuenta
      const result = googleUser ? await switchGoogleAccount() : await signInWithGoogle();
      setGoogleUser(result);
      
      const displayName = result.displayName || "";
      
      setForm((prev) => ({
        ...prev,
        email: result.email || prev.email,
        nombre: prev.nombre || displayName,
      }));
      
      toast.success(
        googleUser 
          ? "¡Cuenta cambiada correctamente!" 
          : "¡Sesión iniciada con Google!", 
        {
          description: "Tus datos han sido completados automáticamente.",
        }
      );
      
    } catch (err) {
      console.error('Error with Google login:', err);
      setErrors((prev) => ({ 
        ...prev, 
        email: "Error al iniciar sesión con Google" 
      }));
      toast.error("Error al iniciar sesión con Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      email: "",
      telefono: "",
    });
    setErrors({
      nombre: "",
      email: "",
      telefono: "",
    });
    setIsSubmitted(false);
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
    googleLoading,
    isPending,
    handleDelete,
    isSubmitted,
    isError,
    error,
    user,
    googleUser,
    resetForm,
  };
}