import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { firebaseApp } from "@/services/firebase";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/Button";
import { Link } from "@tanstack/react-router";
import { Input } from "@/shared/components/Input";
import { usePostReservaServicio } from "@/slices/services/hooks/usePostRequestService";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ServiceReservationForm() {
  const { mutate, isPending, isSuccess, isError, error, reset } = usePostReservaServicio();
  const user = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    detalle: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    detalle: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: prev.nombre || user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("¡Solicitud enviada correctamente!", {
        style: {
          background: "#22c55e", // verde tailwind 500
          border: "1px solid #22c55e", // verde tailwind 600
          color: "white",
        },
      });
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        detalle: "",
      });
      setErrors({
        nombre: "",
        email: "",
        telefono: "",
        detalle: "",
      });
      reset();
    }
  }, [isSuccess, reset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let maxLength = 50;
    if (name === "telefono") maxLength = 15;
    if (name === "detalle") maxLength = 200;
    if (value.length > maxLength) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { nombre: "", email: "", telefono: "", detalle: "" };
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
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
    if (!form.detalle.trim()) {
      newErrors.detalle = "El detalle es obligatorio.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);
      try {
        await signInWithPopup(auth, provider);
      } catch (err) {
        setErrors((prev) => ({ ...prev, email: "Error al iniciar sesión con Google" }));
        return;
      }
      return;
    }
    if (!validateForm()) return;
    mutate({
      ...form,
      email: user.email || form.email,
    });
  };

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        Solicita más información sobre este servicio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <Input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ejemplo: Juan Pérez"
            maxLength={50}
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ejemplo: juan@email.com"
            disabled={!!user}
            maxLength={50}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <Input
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ejemplo: 8888-8888"
            maxLength={15}
          />
          {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="detalle" className="block text-sm font-medium text-gray-700 mb-1">
          Detalle de reservación
        </label>
        <Input
          id="detalle"
          name="detalle"
          value={form.detalle}
          onChange={handleChange}
          placeholder="Ejemplo: Quiero reservar para el mes de octubre"
          maxLength={200}
        />
        {errors.detalle && <p className="text-red-600 text-xs mt-1">{errors.detalle}</p>}
      </div>
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          variant="green"
          className="hover:bg-[#435349] hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Solicitar"}
        </Button>
        <Link to="/servicios">
          <Button variant="white" className="hover:bg-gray-200 hover:cursor-pointer">
            Cancelar
          </Button>
        </Link>
      </div>
      {isError && <p className="text-red-600 mt-2">Error: {String(error)}</p>}
    </form>
  );
}