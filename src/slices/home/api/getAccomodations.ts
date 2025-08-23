import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/services/firebase"
import type { HospedajeDestacado } from "../sections/accomodations/type"


 function getAccomodations() {
  const [hospedajes, setHospedajes] = useState<HospedajeDestacado[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "hospedaje"), where("destacado", "==", true))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as HospedajeDestacado[]
        setHospedajes(data)
      } catch (error) {
        console.error("Error al cargar hospedajes destacados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { hospedajes, loading }
}

export default getAccomodations