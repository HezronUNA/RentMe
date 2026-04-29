import { H2, H4, P, Small } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";

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
    titulo: 'NUESTRAS MODALIDADES DE TRABAJO',
    descripcion:
      'Desde una colaboración como coanfitrión en Airbnb, hasta una administración completa, te ofrecemos soluciones flexibles, efectivas y enfocadas en maximizar la rentabilidad de tu propiedad sin que tengas que preocuparte por nada.',
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <H2 className="text-center text-3xl md:text-4xl font-title uppercase mb-4">
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

type ModalidadCardProps = {
  modalidad: any;
  numero: number;
};

function ModalidadCard({ modalidad, numero }: ModalidadCardProps) {
  const hasServiciosIncluidos = modalidad.serviciosIncluidosData && modalidad.serviciosIncluidosData.length > 0;
  const hasServiciosAdicionales = modalidad.serviciosAdicionalesData && modalidad.serviciosAdicionalesData.length > 0;
  return (
    <div className="bg-neutral-50 border border-zinc-200 rounded-2xl p-8 shadow-lg hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="w-16 h-16 bg-[#52655B] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
        <span className="text-2xl font-bold">{numero}</span>
      </div>

      <H4 className="text-center mb-4">{modalidad.nombre}</H4>

      <div className="flex justify-center mb-8">
        <Button
          variant="green"
          className="px-8 hover:cursor-pointer hover:bg-[#435349]"
          onClick={() => {}}
        >
          <Small className="font-medium">{modalidad.textBoton || 'Reservar'}</Small>
        </Button>
      </div>

      <div className="flex-1">
        {hasServiciosIncluidos && (
          <div className="mb-6">
            <P className="text-sm font-semibold text-gray-700 mb-4">Esta modalidad incluye:</P>
            <ul className="space-y-6">
              {modalidad.serviciosIncluidosData.map((servicio: any, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              {modalidad.serviciosAdicionalesData.map((servicio: any, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  );
}
