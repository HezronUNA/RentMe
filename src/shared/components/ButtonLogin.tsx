// GoogleLoginButton.tsx
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../services/firebase";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado:", user);
      // Aquí puedes redirigir o guardar la info del usuario
    } catch (error) {
      console.error("Error en login con Google:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow hover:bg-gray-100 transition disabled:opacity-50"
    >
      {loading ? "Cargando..." : "Iniciar sesión con Google"}
    </button>
  );
}
