import { Button } from "@/shared/components/button"
import getAccomodations from "../../api/getAccomodations"

export default function HospedajesDestacados() {
const { hospedajes, loading } = getAccomodations()

if (loading) return <div className="py-10 text-center">Cargando...</div>
if (!hospedajes.length) return <div className="py-10 text-center">Sin propiedades destacadas.</div>

return (
<section className="w-full flex flex-col items-center gap-6 py-10 px-4">
<h2 className="text-center text-2xl md:text-4xl font-light uppercase tracking-widest">
Alojamientos Disponibles
</h2>

<div className="relative w-full flex justify-center overflow-x-auto">
<div className="flex gap-8 w-full max-w-[1200px] px-6 md:px-16 justify-center">
{hospedajes.map((hospedaje) => (
<div
key={hospedaje.id}
className="relative w-full max-w-[1000px] h-[600px] flex-shrink-0 rounded-lg overflow-hidden bg-black shadow-md group"
>
<img
src={hospedaje.Imagenes[0] || "https://placehold.co/1100x650"}
alt={hospedaje.nombre}
className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
/>

<div className="absolute bottom-10 left-10 text-white max-w-[600px] space-y-2">
<h3 className="text-2xl md:text-4xl font-light uppercase tracking-widest">
{hospedaje.ubicacion?.direccion}
</h3>
<p className="text-lg">
{hospedaje.camas} Camas, {hospedaje.baños} Baños, {hospedaje.cuartos} Habitaciones
</p>
<p className="text-2xl font-medium tracking-wide">
{hospedaje.precioNoche.toLocaleString("es-CR")}₡ por noche
</p>

<Button variant="whiteBorder" className="hover:cursor-pointer hover:bg-gray-300">Ver propiedad</Button>



</div>
</div>
))}
</div>
</div>

<Button variant="green" className="hover:cursor-pointer hover:bg-[#52655B]/90">Ver más propiedades</Button>


</section>
)
}