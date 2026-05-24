import { H2, H4, P, Small } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

// Datos estáticos de las modalidades
const MODALIDADES = [
  {
    id: 'modalidad-1',
    nombre: 'Coanfrición en Airbnb',
    textBoton: 'Reservar',
    serviciosIncluidosData: [
      'Gestión total de perfil Airbnb',
      'Check in & Check out',
      'Supervisión de limpieza profesional',
      'Resolución de emergencias',
      'Comunicación con huéspedes antes, durante y después de la estadía',
      'Promoción continua con optimización de anuncios y tarifas',
    ],
    serviciosAdicionalesData: [],
  },
  {
    id: 'modalidad-2',
    nombre: 'Promoción a través de nuestras plataformas',
    textBoton: 'Reservar',
    serviciosIncluidosData: [
      'Todo lo mencionado en la opción 1',
    ],
    serviciosAdicionalesData: [
      'Promoción en nuestras redes sociales',
      'Se cobra un depósito de garantía por posible daños',
      'Nos hacemos responsables ante cualquier inconveniente como lo hace Airbnb',
      'Ideal para alojamientos fuera de plataformas tradicionales',
    ],
  },
  {
    id: 'modalidad-3',
    nombre: 'Administración total',
    textBoton: 'Reservar',
    serviciosIncluidosData: [
      'Todo lo mencionado en las opciones 1 y 2',
      'Promoción en nuestras redes sociales',
      'Resolución de emergencias',
    ],
    serviciosAdicionalesData: [
      'Pago de servicios públicos',
      'Servicio de contabilidad',
    ],
  },
];

export default function ModalidadesServicio() {
  const titleData = {
    titulo: 'Nuestras Modalidades de Trabajo',
    descripcion:
      'Desde una colaboración como coanfitrión en Airbnb, hasta una administración completa, te ofrecemos soluciones flexibles, efectivas y enfocadas en maximizar la rentabilidad de tu propiedad sin que tengas que preocuparte por nada.',
  };

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute left-[-8rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[#e7eee9]/55 blur-[95px]" />
        <div className="absolute right-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[#f1e8dc]/55 blur-[95px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold text-center">
          Gestion Integral Inmobiliaria
        </p>
        <H2 className="sm:max-w-7xl text-center mx-auto mt-3 mb-4">
          {titleData.titulo}
        </H2>
        <P className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {titleData.descripcion}
        </P>

        <div className="grid lg:grid-cols-3 gap-8">
          {MODALIDADES.map((modalidad, index) => (
            <ModalidadCard key={modalidad.id} modalidad={modalidad} numero={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Modalidad = {
  id: string;
  nombre: string;
  textBoton?: string;
  serviciosIncluidosData: string[];
  serviciosAdicionalesData: string[];
};

type ModalidadCardProps = {
  modalidad: Modalidad;
  numero: number;
};

function ModalidadCard({ modalidad, numero }: ModalidadCardProps) {
  const hasServiciosIncluidos = modalidad.serviciosIncluidosData && modalidad.serviciosIncluidosData.length > 0;
  const hasServiciosAdicionales = modalidad.serviciosAdicionalesData && modalidad.serviciosAdicionalesData.length > 0;
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fbfbfa] shadow-[0_12px_30px_rgba(82,101,91,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.08)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f7] via-[#fbfbfa] to-[#f5f6f5]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.04),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.55),transparent_42%)]" />

      <div className="relative p-6 md:p-8 flex flex-col h-full">
        <div className="w-16 h-16 bg-[#52655B] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <span className="text-2xl font-bold">{numero}</span>
        </div>

        <H4 className="text-center mb-4">{modalidad.nombre}</H4>

        <div className="flex justify-center mb-8">
          <Button
            asChild
            variant="green"
            className="px-8 hover:cursor-pointer hover:bg-[#435349]"
          >
            <Link to="/reservar-servicio" search={{ servicio: modalidad.nombre }}>
              <Small className="font-medium">{modalidad.textBoton || 'Reservar'}</Small>
            </Link>
          </Button>
        </div>

        <div className="flex-1">
        {hasServiciosIncluidos && (
          <div className="mb-6">
            <P className="text-sm font-semibold text-gray-700 mb-4">Esta modalidad incluye:</P>
            <ul className="space-y-6">
              {modalidad.serviciosIncluidosData.map((servicio: string, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#52655B] flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{servicio}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasServiciosAdicionales && (
          <div>
            <P className="text-sm font-semibold text-gray-700 mb-4">Además de eso incluye:</P>
            <ul className="space-y-6">
              {modalidad.serviciosAdicionalesData.map((servicio: string, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#52655B] flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{servicio}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!hasServiciosIncluidos && !hasServiciosAdicionales && (
          <div className="text-center py-8">
            <P className="text-gray-500 text-sm">Los detalles de esta modalidad se están cargando...</P>
          </div>
        )}
      </div>
      </div>
    </article>
  );
}
