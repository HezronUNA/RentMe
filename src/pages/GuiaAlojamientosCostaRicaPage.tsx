import { Helmet } from 'react-helmet-async'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Home, MapPin, BookOpen } from 'lucide-react'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre un hotel y un hospedaje?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La principal diferencia radica en los servicios y la estructura. Un hotel suele ofrecer servicios completos como recepción 24 horas, restaurante, room service, limpieza diaria y áreas comunes como piscina o gimnasio. Un hospedaje (como los que ofrece DMR Rentals) es generalmente una casa o apartamento completo que alquilas para ti solo, lo que te da mayor privacidad, espacio y flexibilidad, aunque con menos servicios adicionales. Los hospedajes suelen ser más económicos y permiten una experiencia más local y auténtica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la forma de alojamiento más económica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La forma de alojamiento más económica suele ser el hospedaje o alquiler vacacional, especialmente si viajas en grupo o familia. Alquilar una casa o apartamento completo te permite dividir el costo entre varias personas y ahorrar en comidas al contar con cocina. Los hostales también son económicos para viajeros solitarios. En Costa Rica, los hospedajes ofrecen excelente relación calidad-precio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es más barato, un hotel o un hostal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generalmente, los hostales son más baratos que los hoteles, especialmente si optas por habitaciones compartidas (dormitorios). Un hostal puede costar entre $15 y $40 por noche en Costa Rica, mientras que un hotel económico ronda los $50 a $80. Sin embargo, los hostales ofrecen menos privacidad y servicios básicos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es más caro, un hotel o un hostal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los hoteles son significativamente más caros que los hostales. Un hotel de gama media en Costa Rica puede costar entre $80 y $150 por noche, mientras que un hostal privado ronda los $30-$60. Los hoteles de lujo pueden superar los $300 por noche. Los hostales son ideales para presupuestos ajustados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye un hospedaje?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un hospedaje típicamente incluye el espacio completo (casa o apartamento), cocina equipada, baño privado, habitaciones, sala de estar, y servicios como WiFi, estacionamiento y áreas verdes. Algunos hospedajes incluyen servicios adicionales como piscina, jardín, terraza y equipo de cocina completo. A diferencia de los hoteles, no suelen incluir limpieza diaria ni restaurante."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es más barato, hoteles o moteles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En Costa Rica, los moteles suelen ser más económicos que los hoteles, pero es importante entender que los moteles en el país están diseñados principalmente para estancias cortas y usualmente se rentan por horas. Para estancias vacacionales, los hospedajes y hoteles ofrecen mejor relación calidad-precio y mayor comodidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son los mejores lugares para alojarse en Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los mejores lugares para alojarse en Costa Rica incluyen: San José (centro cultural y de negocios), Guanacaste (playas espectaculares como Tamarindo y Papagayo), Puntarenas (Manuel Antonio, Jacó y Monteverde), Limón (Puerto Viejo y Cahuita para ambiente caribeño), Alajuela (La Fortuna y volcán Arenal), y la provincia de San José con zonas como Escazú y Santa Ana para mayor comodidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Dónde se recomienda hospedarse en Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda hospedarse en hospedajes vacacionales o casas de alquiler en zonas como Escazú, Santa Ana, La Fortuna, Manuel Antonio, Tamarindo y Puerto Viejo. Estas áreas ofrecen buena conexión con atracciones turísticas, servicios cercanos y opciones de hospedaje seguro. DMR Rentals ofrece excelentes opciones en las mejores ubicaciones del país."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son los 10 mejores lugares para visitar en Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los 10 lugares imperdibles de Costa Rica son: 1) Parque Nacional Manuel Antonio, 2) Volcán Arenal y La Fortuna, 3) Monteverde y sus bosques nubosos, 4) Tamarindo y sus playas, 5) Puerto Viejo y el Caribe Sur, 6) Parque Nacional Tortuguero, 7) Península de Papagayo, 8) Valle Central y San José, 9) Cahuita y su parque nacional, 10) Jacó y sus olas para surf."
      }
    },
    {
      "@type": "Question",
      "name": "¿Dónde ir a Costa Rica por primera vez?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Para quienes visitan Costa Rica por primera vez, se recomienda comenzar por el Valle Central (San José, Escazú, Santa Ana) para aclimatarse, luego visitar La Fortuna y el Volcán Arenal, seguido de Monteverde y finalmente las playas de Guanacaste o Manuel Antonio. Esta ruta ofrece una muestra completa de naturaleza, aventura y playa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la zona más segura de Costa Rica para alojarse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las zonas más seguras para alojarse en Costa Rica incluyen Escazú, Santa Ana, Rohrmoser, Sabana Este y La Fortuna. Estas áreas cuentan con baja tasa de delincuencia, buena iluminación, vigilancia privada y servicios de calidad. DMR Rentals selecciona cuidadosamente sus propiedades en estas zonas seguras."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son las zonas más seguras de Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las zonas más seguras de Costa Rica son: Escazú, Santa Ana, Curridabat, Rohrmoser, Sabana, La Fortuna, Manuel Antonio (zona turística), Tamarindo (centro), Puerto Viejo y Nosara. Estas áreas tienen presencia de seguridad privada, buena infraestructura y son frecuentadas por turistas y residentes de confianza."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué parte de Costa Rica es la más segura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La parte más segura de Costa Rica para turistas es la región del Valle Central, específicamente los cantones de Escazú, Santa Ana y Curridabat. También las zonas turísticas consolidadas como La Fortuna, Manuel Antonio y Tamarindo son muy seguras gracias a la vigilancia constante y la actividad turística."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el cantón más seguro de Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según estadísticas oficiales, Escazú es considerado uno de los cantones más seguros de Costa Rica, junto con Santa Ana, Curridabat y Belén. Estos cantones del Valle Central tienen índices de criminalidad significativamente más bajos que el promedio nacional y cuentan con excelente infraestructura."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la ciudad más segura de Costa Rica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No existe una ciudad designada oficialmente como la más segura, pero Escazú y Santa Ana son consideradas las áreas urbanas más seguras para vivir y visitar en Costa Rica. También La Fortuna destaca como un pueblo turístico extremadamente seguro para los visitantes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué significa que un hotel diga adults only?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Adults Only significa que el hotel o resort solo admite huéspedes mayores de 18 años. Estos establecimientos están diseñados para ofrecer una experiencia sin niños, con ambientes más tranquilos, servicios enfocados en adultos como bares, spas, y áreas de relajación exclusivas. Son ideales para parejas o viajeros que buscan tranquilidad."
      }
    }
  ]
}

const sections = [
  { id: 'diferencia-hotel-hospedaje', label: '¿Qué diferencia hay entre un hotel y un hospedaje?' },
  { id: 'alojamiento-mas-economico', label: '¿Cuál es la forma de alojamiento más económica?' },
  { id: 'mas-barato-hotel-hostal', label: '¿Qué es más barato, un hotel o un hostal?' },
  { id: 'mas-caro-hotel-hostal', label: '¿Qué es más caro, un hotel o un hostal?' },
  { id: 'que-incluye-hospedaje', label: '¿Qué incluye un hospedaje?' },
  { id: 'mas-barato-hoteles-moteles', label: '¿Qué es más barato, hoteles o moteles?' },
  { id: 'mejores-lugares-alojarse', label: '¿Cuáles son los mejores lugares para alojarse en Costa Rica?' },
  { id: 'donde-recomienda-hospedarse', label: '¿Dónde se recomienda hospedarse en Costa Rica?' },
  { id: '10-mejores-lugares-visitar', label: '¿Cuáles son los 10 mejores lugares para visitar en Costa Rica?' },
  { id: 'donde-ir-primera-vez', label: '¿Dónde ir a Costa Rica por primera vez?' },
  { id: 'zona-mas-segura-alojarse', label: '¿Cuál es la zona más segura de Costa Rica para alojarse?' },
  { id: 'zonas-mas-seguras', label: '¿Cuáles son las zonas más seguras de Costa Rica?' },
  { id: 'parte-mas-segura', label: '¿Qué parte de Costa Rica es la más segura?' },
  { id: 'canton-mas-seguro', label: '¿Cuál es el cantón más seguro de Costa Rica?' },
  { id: 'ciudad-mas-segura', label: '¿Cuál es la ciudad más segura de Costa Rica?' },
  { id: 'adults-only-significado', label: '¿Qué significa que un hotel diga adults only?' },
]

const contentSections = [
  {
    id: 'diferencia-hotel-hospedaje',
    title: '¿Qué diferencia hay entre un hotel y un hospedaje?',
    paragraphs: [
      'La principal diferencia entre un hotel y un hospedaje radica en los servicios, la estructura y la experiencia que ofrecen al viajero. Un hotel tradicional opera bajo un modelo de servicio completo: recepción 24 horas, restaurante o room service, limpieza diaria de habitaciones, áreas comunes como piscina, gimnasio o lobby, y personal disponible en todo momento.',
      'Un hospedaje vacacional, como los que ofrece DMR Rentals, es generalmente una casa o apartamento completo que alquilas para tu uso exclusivo. Esto te brinda mayor privacidad, espacio y flexibilidad. Tienes acceso a cocina completa, sala de estar, habitaciones privadas y, en muchos casos, áreas al aire libre como jardines o terrazas.',
      'Los hospedajes suelen ser más económicos, especialmente para grupos o familias, y permiten una experiencia más auténtica al vivir como un local. La diferencia clave está en la independencia: en un hospedaje eres dueño de tu espacio, mientras que en un hotel estás sujeto a horarios y normas del establecimiento.',
    ],
  },
  {
    id: 'alojamiento-mas-economico',
    title: '¿Cuál es la forma de alojamiento más económica?',
    paragraphs: [
      'La forma de alojamiento más económica en Costa Rica depende del tipo de viajero que seas. Para familias o grupos, los hospedajes vacacionales son la opción más rentable, ya que permits dividir el costo entre varias personas y ahorrar significativamente en alimentación al contar con cocina equipada.',
      'Para viajeros solitarios, los hostales con habitaciones compartidas (dormitorios) son la alternativa más barata, con precios desde $15 por noche. Sin embargo, sacrificas privacidad y comodidad. Los hospedajes privados ofrecen el mejor equilibrio entre costo y calidad para la mayoría de los viajeros.',
      'En DMR Rentals encontrarás hospedajes con excelente relación calidad-precio en las mejores ubicaciones de Costa Rica, ideales tanto para viajeros solitarios como para familias que buscan maximizar su presupuesto sin renunciar a la comodidad.',
    ],
  },
  {
    id: 'mas-barato-hotel-hostal',
    title: '¿Qué es más barato, un hotel o un hostal?',
    paragraphs: [
      'Los hostales son significativamente más baratos que los hoteles. En Costa Rica, un hostal puede costar entre $15 y $40 por noche en habitación compartida, mientras que un hostal con habitación privada ronda los $30-$60. Un hotel económico, en cambio, comienza en $50 y puede superar los $150 por noche en categoría media.',
      'La diferencia de precio se justifica por los servicios: los hostales ofrecen servicios básicos como cocina compartida, áreas comunes y, en ocasiones, desayuno incluido. Los hoteles brindan mayor privacidad, limpieza diaria, recepción y servicios adicionales como piscina o gimnasio.',
      'Si viajas con presupuesto limitado, combinar hospedajes vacacionales (para mayor comodidad en grupo) con hostales (para noches sueltas) puede ser una excelente estrategia para ahorrar.',
    ],
  },
  {
    id: 'mas-caro-hotel-hostal',
    title: '¿Qué es más caro, un hotel o un hostal?',
    paragraphs: [
      'Los hoteles son considerablemente más caros que los hostales. Un hotel de gama media en Costa Rica cuesta entre $80 y $150 por noche, mientras que los hoteles de lujo pueden superar los $300. En contraste, un hostal privado ronda los $30-$60, y un dormitorio compartido cuesta apenas $15-$25.',
      'El precio más alto de los hoteles se debe a los servicios incluidos: personal permanente, restaurante, limpieza, mantenimiento de áreas comunes y amenidades como piscina, spa o gimnasio. Los hostales minimizan estos costos ofreciendo una experiencia más básica pero funcional.',
      'Para quienes buscan el punto medio, los hospedajes vacacionales de DMR Rentals ofrecen la privacidad y comodidad de un hotel a precios más accesibles, especialmente para estancias prolongadas o viajes en grupo.',
    ],
  },
  {
    id: 'que-incluye-hospedaje',
    title: '¿Qué incluye un hospedaje?',
    paragraphs: [
      'Un hospedaje vacacional típicamente incluye el espacio completo: casa o apartamento con cocina equipada (refrigerador, estufa, utensilios), baño privado, habitaciones con camas, sala de estar y comedor. La mayoría ofrece servicios básicos como WiFi de alta velocidad, estacionamiento privado, y áreas verdes o jardín.',
      'Dependiendo del tipo de hospedaje, puede incluir servicios adicionales como piscina, terraza con vista, equipo de cocina completo, lavandería, televisión por cable, aire acondicionado y zonas de barbacoa. Algunos hospedajes premium incluyen jacuzzi, gimnasio privado o acceso directo a la playa.',
      'A diferencia de los hoteles, los hospedajes no suelen incluir limpieza diaria, restaurante o recepción 24 horas. Sin embargo, ofrecen total privacidad y la libertad de manejar tus propios horarios, lo que muchos viajeros valoran más que los servicios adicionales.',
    ],
  },
  {
    id: 'mas-barato-hoteles-moteles',
    title: '¿Qué es más barato, hoteles o moteles?',
    paragraphs: [
      'En Costa Rica, los moteles suelen ser más económicos que los hoteles, pero es importante entender su naturaleza. Los moteles en el país están diseñados principalmente para estancias cortas y se rentan por horas (2-4 horas típicamente), con tarifas que oscilan entre $15 y $40.',
      'Para estancias vacacionales de varios días, los moteles no son la opción más recomendable, ya que no están diseñados para pernoctar cómodamente ni ofrecen servicios turísticos. Los hoteles y hospedajes vacacionales son mucho más adecuados para turistas.',
      'La mejor relación calidad-precio para vacaciones en Costa Rica la encuentras en los hospedajes vacacionales de DMR Rentals, que ofrecen tarifas competitivas con todas las comodidades del hogar.',
    ],
  },
  {
    id: 'mejores-lugares-alojarse',
    title: '¿Cuáles son los mejores lugares para alojarse en Costa Rica?',
    paragraphs: [
      'Costa Rica ofrece una gran diversidad de destinos, cada uno con su propio encanto. Para los amantes de la playa, Guanacaste (Tamarindo, Papagayo, Samara) y Puntarenas (Manuel Antonio, Jacó) tienen las mejores opciones. Para naturaleza y aventura, La Fortuna y Monteverde son imperdibles.',
      'En el Valle Central, San José, Escazú y Santa Ana ofrecen hospedajes con excelente conectividad, cerca de restaurantes, centros comerciales y servicios. Para una experiencia caribeña única, Puerto Viejo y Cahuita en Limón son destinos obligados.',
      'Cada región tiene su personalidad: el Pacífico Norte es más seco y playero, el Pacífico Central combina playa con bosque, el Caribe ofrece ambiente relajado y cultura afrocaribeña, y la zona norte destaca por sus volcanes y aguas termales.',
    ],
  },
  {
    id: 'donde-recomienda-hospedarse',
    title: '¿Dónde se recomienda hospedarse en Costa Rica?',
    paragraphs: [
      'Se recomienda hospedarse en zonas que combinen seguridad, conectividad y acceso a atracciones turísticas. Escazú y Santa Ana son ideales para quienes buscan tranquilidad cerca de San José. La Fortuna y Manuel Antonio son perfectos para los amantes de la naturaleza.',
      'Tamarindo y Jacó son excelentes para quienes buscan playa, surf y vida nocturna. Puerto Viejo ofrece una experiencia caribeña auténtica. Para los que viajan por negocios, las zonas de Sabana y Rohrmoser en San José son las mejores opciones.',
      'DMR Rentals selecciona cuidadosamente cada propiedad en estas ubicaciones privilegiadas, garantizando hospedajes seguros, cómodos y bien ubicados para que disfrutes al máximo tu estadía en Costa Rica.',
    ],
  },
  {
    id: '10-mejores-lugares-visitar',
    title: '¿Cuáles son los 10 mejores lugares para visitar en Costa Rica?',
    paragraphs: [
      'Costa Rica es un paraíso natural con innumerables destinos. Estos son los 10 lugares que no puedes perderte: Parque Nacional Manuel Antonio, con sus playas de arena blanca y biodiversidad única; el Volcán Arenal y La Fortuna, con aguas termales y senderismo; Monteverde y su increíble bosque nuboso.',
      'Tamarindo, el destino de surf más famoso del Pacífico; Puerto Viejo y el Caribe Sur, con su ambiente relajado y playas de ensueño; el Parque Nacional Tortuguero, ideal para observar tortugas marinas y vida silvestre; y la Península de Papagayo, con sus lujosos resorts y playas vírgenes.',
      'Completan la lista: el Valle Central y San José, corazón cultural del país; Cahuita y su parque nacional marino; y Jacó, conocido por sus olas perfectas para surf y su vibrante vida nocturna. Cada destino ofrece experiencias únicas que hacen de Costa Rica un país extraordinario.',
    ],
  },
  {
    id: 'donde-ir-primera-vez',
    title: '¿Dónde ir a Costa Rica por primera vez?',
    paragraphs: [
      'Para quienes visitan Costa Rica por primera vez, la ruta recomendada combina ciudad, naturaleza y playa. Comienza en el Valle Central, alojándote en Escazú o Santa Ana para aclimatarte y conocer San José. Luego dirígete a La Fortuna para experimentar el volcán Arenal, aguas termales y canopy.',
      'Continúa hacia Monteverde para explorar el bosque nuboso con puentes colgantes y tirolesa. Finalmente, relájate en las playas de Guanacaste (Tamarindo o Papagayo) o Manuel Antonio, donde podrás disfrutar del Pacífico y su increíble biodiversidad.',
      'Esta ruta te dará una muestra completa de lo que Costa Rica ofrece: cultura, aventura, naturaleza y playa. DMR Rentals tiene hospedajes en cada uno de estos destinos para hacer tu viaje inolvidable.',
    ],
  },
  {
    id: 'zona-mas-segura-alojarse',
    title: '¿Cuál es la zona más segura de Costa Rica para alojarse?',
    paragraphs: [
      'Las zonas más seguras para alojarse en Costa Rica son Escazú, Santa Ana, Rohrmoser y Sabana Este en el Valle Central. Estas áreas cuentan con bajos índices de criminalidad, vigilancia privada, buena iluminación y servicios de calidad. Son las preferidas por familias y ejecutivos.',
      'En las zonas turísticas, La Fortuna, Manuel Antonio y Tamarindo son muy seguras gracias a la constante presencia de turistas y la inversión en seguridad. Puerto Viejo y Nosara también son considerados seguros para los visitantes.',
      'DMR Rentals selecciona exclusivamente propiedades en estas zonas seguras, garantizando tranquilidad y comodidad durante tu estadía en Costa Rica.',
    ],
  },
  {
    id: 'zonas-mas-seguras',
    title: '¿Cuáles son las zonas más seguras de Costa Rica?',
    paragraphs: [
      'Las zonas más seguras de Costa Rica para vivir y visitar incluyen: Escazú, con sus exclusivos centros comerciales y residenciales; Santa Ana, conocida por sus urbanizaciones cerradas; Curridabat, con excelente infraestructura; y Rohrmoser, un barrio tradicional de San José.',
      'En las provincias, La Fortuna destaca como el destino turístico más seguro del país. Manuel Antonio y Tamarindo tienen zonas turológicas muy seguras. Nosara, en Guanacaste, es famosa por su ambiente tranquilo y seguro. Belén y San Rafael de Heredia también son cantones con baja criminalidad.',
      'Estas zonas comparten características como buena iluminación, presencia de seguridad privada, servicios de calidad y comunidades organizadas que las convierten en las mejores opciones para turistas y residentes.',
    ],
  },
  {
    id: 'parte-mas-segura',
    title: '¿Qué parte de Costa Rica es la más segura?',
    paragraphs: [
      'La región más segura de Costa Rica para turistas es el Valle Central, específicamente los cantones de Escazú, Santa Ana y Curridabat. Esta zona concentra la mejor infraestructura del país, servicios de calidad y los índices de seguridad más favorables.',
      'Para turistas, las zonas turísticas consolidadas como La Fortuna, Manuel Antonio y Tamarindo ofrecen niveles de seguridad comparables a los del Valle Central, gracias a la vigilancia constante y la actividad turística que genera entornos vigilados y cuidados.',
      'La clave para una estadía segura es elegir bien el alojamiento y la ubicación. DMR Rentals verifica cada propiedad y su entorno para asegurar que cumplan con los más altos estándares de seguridad.',
    ],
  },
  {
    id: 'canton-mas-seguro',
    title: '¿Cuál es el cantón más seguro de Costa Rica?',
    paragraphs: [
      'Según los datos del Organismo de Investigación Judicial (OIJ) y el Observatorio de Seguridad Ciudadana, los cantones de Escazú, Santa Ana, Curridabat y Belén son considerados los más seguros de Costa Rica. Estos cantones del Valle Central tienen tasas de criminalidad significativamente menores al promedio nacional.',
      'Escazú lidera frecuentemente las listas de seguridad, con una combinación de inversión privada en seguridad, presencia policial y comunidades organizadas. Santa Ana le sigue de cerca con sus urbanizaciones cerradas y vigilancia constante.',
      'Para los turistas, alojarse en estos cantones garantiza una experiencia tranquila, con acceso a los mejores restaurantes, centros comerciales y servicios, además de una excelente conectividad con el resto del país.',
    ],
  },
  {
    id: 'ciudad-mas-segura',
    title: '¿Cuál es la ciudad más segura de Costa Rica?',
    paragraphs: [
      'Si bien no existe una designación oficial única, Escazú y Santa Ana son ampliamente reconocidas como las ciudades más seguras de Costa Rica. Estas áreas del Gran Área Metropolitana combinan baja criminalidad con excelente calidad de vida y servicios.',
      'La Fortuna, aunque es un pueblo y no una ciudad grande, es considerada el destino turístico más seguro del país. Su economía basada en el turismo sostenible ha creado un entorno donde la seguridad es prioridad para todos los actores locales.',
      'Para los viajeros, la seguridad depende en gran medida de la ubicación del alojamiento. DMR Rentals garantiza propiedades en las zonas más seguras, permitiéndote disfrutar Costa Rica con total tranquilidad.',
    ],
  },
  {
    id: 'adults-only-significado',
    title: '¿Qué significa que un hotel diga adults only?',
    paragraphs: [
      'Adults Only es una clasificación hotelera que indica que el establecimiento solo acepta huéspedes mayores de 18 años. Estos hoteles están diseñados para ofrecer una experiencia libre de niños, con ambientes más tranquilos y sofisticados enfocados en adultos.',
      'Los hoteles adults only suelen incluir servicios como bares, spas, piscinas exclusivas para adultos, áreas de relajación, restaurantes gourmet y actividades como catas de vino o clases de cocina. Son ideales para lunas de miel, escapadas románticas o viajes de relajación.',
      'En Costa Rica, varios resorts en Guanacaste y Manuel Antonio ofrecen esta modalidad. Sin embargo, para quienes viajan en familia, los hospedajes vacacionales de DMR Rentals son la mejor alternativa, ofreciendo espacio y libertad para todos.',
    ],
  },
]

export default function GuiaAlojamientosCostaRicaPage() {
  return (
    <>
      <Helmet>
        <title>¿Dónde hospedarse en Costa Rica? Guía Completa de Alojamientos 2026 | DMR Rentals</title>
        <meta name="description" content="Descubre los mejores lugares para hospedarse en Costa Rica, diferencias entre hoteles y hospedajes, zonas seguras, precios y recomendaciones para tus vacaciones." />
        <meta name="keywords" content="alojamientos en Costa Rica, dónde hospedarse en Costa Rica, mejores lugares para alojarse en Costa Rica, zonas seguras Costa Rica, hospedajes Costa Rica, alquiler vacacional Costa Rica" />
        <link rel="canonical" href="https://dmrrentals.com/blog/guia-alojamientos-costa-rica" />
        <meta property="og:title" content="¿Dónde hospedarse en Costa Rica? Guía Completa de Alojamientos 2026" />
        <meta property="og:description" content="Descubre los mejores lugares para hospedarse en Costa Rica, diferencias entre hoteles y hospedajes, zonas seguras, precios y recomendaciones." />
        <meta property="og:url" content="https://dmrrentals.com/blog/guia-alojamientos-costa-rica" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Dónde hospedarse en Costa Rica? Guía Completa de Alojamientos 2026" />
        <meta name="twitter:description" content="Descubre los mejores lugares para hospedarse en Costa Rica." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2b4639] via-[#315748] to-[#1b3328]">
          <div className="absolute inset-0 pointer-events-none">
            <div aria-hidden className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10" style={{ background: '#8a7d52', filter: 'blur(80px)' }} />
            <div aria-hidden className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] rounded-full opacity-10" style={{ background: '#52655B', filter: 'blur(80px)' }} />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
                <li>
                  <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                    <Home className="size-3.5" aria-hidden />
                    <span>Inicio</span>
                  </Link>
                </li>
                <li aria-hidden className="text-white/40">/</li>
                <li className="text-white/50">Blog</li>
                <li aria-hidden className="text-white/40">/</li>
                <li className="text-white font-medium" aria-current="page">¿Dónde hospedarse en Costa Rica?</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <BookOpen className="size-4" aria-hidden />
              <time dateTime="2026-05-24">24 de mayo de 2026</time>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
              ¿Dónde hospedarse en Costa Rica?{' '}
              <span className="block text-[#c4b998] mt-2 text-2xl sm:text-3xl md:text-4xl font-light">
                Guía Completa de Alojamientos 2026
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Descubre los mejores lugares para hospedarse en Costa Rica, diferencias entre hoteles y hospedajes,
              zonas seguras, precios y recomendaciones para tus vacaciones perfectas.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/alojamientos"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2f3a35] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Ver alojamientos disponibles
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
            {/* Table of Contents - Sidebar */}
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-xl border border-[#e2e8e0] bg-[#f8faf8] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="size-4 text-[#52655B]" aria-hidden />
                    <h2 className="text-sm font-semibold text-[#2f3a35] uppercase tracking-wider">
                      Contenido
                    </h2>
                  </div>
                  <nav aria-label="Tabla de contenidos">
                    <ul className="space-y-0.5">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="block py-1.5 px-2 text-xs text-zinc-600 hover:text-[#52655B] hover:bg-[#e7eee9]/40 rounded-md transition-colors leading-relaxed"
                          >
                            {section.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="min-w-0">
              {/* Introduction */}
              <section className="mb-12">
                <p className="text-lg leading-relaxed text-zinc-700">
                  Planificar un viaje a Costa Rica es emocionante, pero elegir el alojamiento adecuado puede ser
                  abrumador. Con tantas opciones disponibles, desde hoteles de lujo hasta acogedores hospedajes
                  vacacionales, es normal tener preguntas. En esta guía completa, respondemos las dudas más
                  frecuentes sobre alojamientos en Costa Rica para ayudarte a tomar la mejor decisión.
                </p>
              </section>

              {/* Content Sections */}
              <div className="space-y-12">
                {contentSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2f3a35] mb-4 pb-3 border-b border-[#e2e8e0]">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((text, i) => (
                        <p key={i} className="text-base leading-relaxed text-zinc-700">
                          {text}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* CTA Section */}
              <section className="mt-16 rounded-2xl bg-gradient-to-br from-[#2b4639] via-[#315748] to-[#1b3328] p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Encuentra tu alojamiento ideal en Costa Rica
                </h2>
                <p className="text-white/80 max-w-lg mx-auto mb-8 text-base leading-relaxed">
                  Explora nuestra selección de hospedajes en las mejores ubicaciones del país.
                  Casas y apartamentos completos con todo lo necesario para unas vacaciones perfectas.
                </p>
                <Link
                  to="/alojamientos"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#2f3a35] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Ver alojamientos disponibles
                  <ArrowRight className="size-5" />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
