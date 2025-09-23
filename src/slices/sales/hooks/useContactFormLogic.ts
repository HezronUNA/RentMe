import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, type User } from "firebase/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { firebaseApp } from "@/services/firebase";
import { toast } from "sonner";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactFormData {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
}

interface ContactFormErrors {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
}

export function useContactFormLogic(propertyId: string, _propertyTitle?: string) {
  const user = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [form, setForm] = useState<ContactFormData>({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    telefono: "",
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    telefono: "",
  });

  // Llenar datos del usuario si está autenticado
  useEffect(() => {
    if (user || googleUser) {
      const displayName = (user?.displayName || googleUser?.displayName) || "";
      const nameParts = displayName.split(' ');
      
      setForm((prev) => ({
        ...prev,
        nombre: prev.nombre || nameParts[0] || "",
        primerApellido: prev.primerApellido || nameParts[1] || "",
        segundoApellido: prev.segundoApellido || nameParts[2] || "",
        email: (user?.email || googleUser?.email) || prev.email,
      }));
    }
  }, [user, googleUser]);

  const handleChange = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let maxLength = 50;
    if (field === "telefono") maxLength = 15;
    
    if (value.length > maxLength) return;
    
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error al empezar a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: ContactFormErrors = {
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      email: "",
      telefono: "",
    };

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }

    if (!form.primerApellido.trim()) {
      newErrors.primerApellido = "El primer apellido es obligatorio.";
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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsPending(true);
    
    try {
      // Simular envío del formulario
      // TODO: Implementar la API para enviar el contacto de propiedad
      console.log('Enviando contacto para propiedad:', propertyId, form);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("¡Mensaje enviado correctamente!", {
        description: "Nos pondremos en contacto contigo pronto.",
        style: {
          background: "#22c55e",
          border: "1px solid #22c55e",
          color: "white",
        },
      });
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error al enviar el formulario", {
        description: "Por favor intenta nuevamente.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    
    try {
      const result = await signInWithPopup(auth, provider);
      setGoogleUser(result.user);
      
      const displayName = result.user.displayName || "";
      const nameParts = displayName.split(' ');
      
      setForm((prev) => ({
        ...prev,
        email: result.user.email || prev.email,
        nombre: prev.nombre || nameParts[0] || "",
        primerApellido: prev.primerApellido || nameParts[1] || "",
        segundoApellido: prev.segundoApellido || nameParts[2] || "",
      }));
      
      toast.success("¡Sesión iniciada con Google!", {
        description: "Tus datos han sido completados automáticamente.",
      });
      
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
      primerApellido: "",
      segundoApellido: "",
      email: "",
      telefono: "",
    });
    setErrors({
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
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
    isSubmitted,
    user,
    googleUser,
    resetForm,
  };
}