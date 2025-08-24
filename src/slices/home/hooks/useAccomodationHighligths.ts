// src/slices/sections/accomodations/hooks/useHospedajesDestacados.ts
import { useEffect, useState, useCallback } from "react"
import type { HospedajeDestacado } from "../sections/accomodations"
import { getAccomodations } from "@/slices/home/api/getAccomodations"

export function useGetAccomodationHighlights() {
  const [hospedajes, setHospedajes] = useState<HospedajeDestacado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAccomodations()
      setHospedajes(data)
    } catch (err) {
      console.error("Error al cargar hospedajes destacados:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        await load()
      } finally {
        if (!mounted) return
      }
    })()
    return () => {
      mounted = false
    }
  }, [load])

  return { hospedajes, loading, error, reload: load }
}

export default useGetAccomodationHighlights
