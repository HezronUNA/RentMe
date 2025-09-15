import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { firebaseApp } from "@/services/firebase";
import { usePostReservaServicio } from "@/slices/services/hooks/usePostRequestService";
import { toast } from "sonner";

function validateEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useLogicFormService() {
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
					background: "#22c55e",
					border: "1px solid #22c55e",
					color: "white",
				},
			});
			setForm({ nombre: "", email: "", telefono: "", detalle: "" });
			setErrors({ nombre: "", email: "", telefono: "", detalle: "" });
			reset();
		}
	}, [isSuccess, reset]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

	return {
		form,
		setForm,
		errors,
		setErrors,
		handleChange,
		handleSubmit,
		isPending,
		isError,
		error,
		user,
	};
}
