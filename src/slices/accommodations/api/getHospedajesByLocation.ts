import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>

// ✅ Obtener hospedajes cerca de coordenadas específicas
export async function getHospedajesByLocation(
    lat: number,
    lng: number,
    radiusKm: number = 10
): Promise<Hospedaje[]> {
    try {
        console.log("🗺️ Buscando hospedajes cerca de:", lat, lng, "con radio:", radiusKm, "km")

        // Para un filtrado básico por área aproximada
        // Calculamos un rango de latitud y longitud aproximado
        const latRange = radiusKm / 111; // 1 grado lat ≈ 111km
        const lngRange = radiusKm / (111 * Math.cos(lat * Math.PI / 180)); // ajustado por latitud

        const minLat = lat - latRange
        const maxLat = lat + latRange
        const minLng = lng - lngRange
        const maxLng = lng + lngRange

        console.log("📍 Rango de búsqueda - Lat:", minLat, "a", maxLat, "Lng:", minLng, "a", maxLng)

        // Obtener todos los hospedajes y filtrar en cliente por ahora
        // (Firestore no permite múltiples where con rangos en campos diferentes)
        const snapshot = await getDocs(hospedajesCol)

        const hospedajes = snapshot.docs
            .map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    imagenes: data.imagenes || data.Imagenes || []
                } as Hospedaje
            })
            .filter(hospedaje => {
                const enRango = (
                    hospedaje.ubicacion.lat >= minLat &&
                    hospedaje.ubicacion.lat <= maxLat &&
                    hospedaje.ubicacion.lng >= minLng &&
                    hospedaje.ubicacion.lng <= maxLng
                )
                if (enRango) {
                    console.log("✅ Hospedaje en rango:", hospedaje.nombre, hospedaje.ubicacion)
                }
                return enRango
            })

        console.log("🎯 Total hospedajes encontrados en ubicación:", hospedajes.length)
        // Ordenar por precio
        return hospedajes.sort((a, b) => a.precioNoche - b.precioNoche)
    } catch (error) {
        console.error("Error obteniendo hospedajes por ubicación:", error)
        throw error
    }
}

// ✅ Buscar hospedajes por texto en nombre o descripción
export async function searchHospedajes(searchText: string): Promise<Hospedaje[]> {
    try {
        // Obtener todos los hospedajes para buscar en el cliente
        // En una implementación más avanzada, se podría usar Algolia o similar
        const snapshot = await getDocs(hospedajesCol)

        const searchLower = searchText.toLowerCase()

        const hospedajes = snapshot.docs
            .map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    imagenes: data.imagenes || data.Imagenes || []
                } as Hospedaje
            })
            .filter(hospedaje => {
                const match = (
                    hospedaje.nombre?.toLowerCase().includes(searchLower) ||
                    hospedaje.descripcion?.toLowerCase().includes(searchLower) ||
                    hospedaje.ubicacion?.direccion?.toLowerCase().includes(searchLower) ||
                    hospedaje.ubicacion?.provincia?.toLowerCase().includes(searchLower) ||
                    hospedaje.ubicacion?.canton?.toLowerCase().includes(searchLower) ||
                    hospedaje.ubicacion?.distrito?.toLowerCase().includes(searchLower)
                )

                return match
            })

        // Ordenar por relevancia (nombre tiene prioridad) y precio
        return hospedajes.sort((a, b) => {
            const aNameMatch = a.nombre.toLowerCase().includes(searchLower)
            const bNameMatch = b.nombre.toLowerCase().includes(searchLower)

            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1

            return a.precioNoche - b.precioNoche
        })
    } catch (error) {
        console.error("Error buscando hospedajes:", error)
        throw error
    }
}