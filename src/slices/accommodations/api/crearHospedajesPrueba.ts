import { db } from "@/services/firebase"
import { collection, addDoc } from "firebase/firestore"
import type { HospedajeFirestore } from "../type"

// Función temporal para agregar hospedajes de prueba
export async function crearHospedajesDePrueba() {
  const hospedajesCol = collection(db, "hospedaje")
  
  const hospedajesPrueba: HospedajeFirestore[] = [
    {
      nombre: "Casa Vista al Mar",
      descripcion: "Hermosa casa con vista panorámica al océano Pacífico. Perfecta para vacaciones familiares.",
      precioNoche: 85000,
      destacado: true,
      cuartos: 3,
      camas: 6,
      baños: 2,
      reglas: {
        fumado: false,
        mascotas: true
      },
      servicios: ["WiFi", "Piscina", "Cocina", "Aire acondicionado", "Estacionamiento"],
      reseñaId: [],
      imagenes: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
      ],
      ubicacion: {
        direccion: "Manuel Antonio, Puntarenas",
        lat: 9.3947,
        lng: -84.1525
      }
    },
    {
      nombre: "Apartamento Centro San José",
      descripcion: "Moderno apartamento en el corazón de San José, cerca de teatros y restaurantes.",
      precioNoche: 45000,
      destacado: false,
      cuartos: 2,
      camas: 4,
      baños: 1,
      reglas: {
        fumado: false,
        mascotas: false
      },
      servicios: ["WiFi", "Cocina", "Lavadora", "TV"],
      reseñaId: [],
      imagenes: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
      ],
      ubicacion: {
        direccion: "San José Centro, San José",
        lat: 9.9281,
        lng: -84.0907
      }
    },
    {
      nombre: "Cabaña en Monteverde",
      descripcion: "Acogedora cabaña en el bosque nuboso de Monteverde. Ideal para amantes de la naturaleza.",
      precioNoche: 65000,
      destacado: true,
      cuartos: 2,
      camas: 4,
      baños: 1,
      reglas: {
        fumado: false,
        mascotas: true
      },
      servicios: ["WiFi", "Cocina", "Chimenea", "Jardín"],
      reseñaId: [],
      imagenes: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=800"
      ],
      ubicacion: {
        direccion: "Monteverde, Puntarenas",
        lat: 10.3181,
        lng: -84.8066
      }
    }
  ]

  try {
    console.log("🌱 Creando hospedajes de prueba...")
    
    for (const hospedaje of hospedajesPrueba) {
      const docRef = await addDoc(hospedajesCol, hospedaje)
      console.log("✅ Hospedaje creado con ID:", docRef.id, hospedaje.nombre)
    }
    
    console.log("🎉 Todos los hospedajes de prueba creados exitosamente!")
    return true
  } catch (error) {
    console.error("❌ Error creando hospedajes de prueba:", error)
    return false
  }
}

// Función para ejecutar en la consola del navegador
// window.crearHospedajesDePrueba = crearHospedajesDePrueba