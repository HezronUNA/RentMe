import { useState } from "react";
import { toast } from "sonner";
import { useCreatePropertyReserve } from "./useCreatePropertyReserve";
import { sanitizeForStorage } from '@/utils/sanitize'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

interface ContactFormErrors {
  nombre: string;
  email: string;
  telefono: string;
}

export function useContactFormLogic(propertyId: string, propertyTitle?: string) {
  const { createReservation, isLoading: isPending, error: reserveError } = useCreatePropertyReserve({ propertyTitle });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [form, setForm] = useState<ContactFormData>({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({
    nombre: "",
    email: "",
    telefono: "",
  });

  const handleDelete = () => {
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    });
    setErrors({
      nombre: "",
      email: "",
      telefono: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let maxLength = 50;
    if (name === "telefono") maxLength = 15;
    if (name === "nombre") maxLength = 100;
    if (name === "mensaje") maxLength = 500;
    
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
    
    if (!validateForm()) return;

    try {
      await createReservation({
        propiedadId: propertyId,
        nombre: sanitizeForStorage(form.nombre) ?? '',
        email: sanitizeForStorage(form.email) ?? '',
        telefono: sanitizeForStorage(form.telefono) ?? '',
        mensaje: sanitizeForStorage(form.mensaje) ?? undefined,
      });
      
      setIsSubmitted(true);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMsg = "Por favor intenta nuevamente.";
      let title = "Error al enviar el formulario";
      
      if (error?.message && typeof error.message === 'string' && error.message.includes('rate_limit_exceeded')) {
        title = "⏱️ Límite de solicitudes";
        errorMsg = "Demasiadas solicitudes. Por favor espera un minuto antes de intentar de nuevo.";
      }
      
      toast.error(title, {
        description: errorMsg,
        duration: 6000,
      });
    }
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
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
    isPending,
    handleDelete,
    isSubmitted,
    error: reserveError,
    resetForm,
  };
}

