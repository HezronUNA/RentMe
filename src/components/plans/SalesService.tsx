import { H2, P } from "@/components/ui/Typography";
import { MarqueeRow } from "./MarqueeRow";

// Datos estáticos de ejemplo
const TOP_ROW = [
  { id: 's1', titulo: 'Fotografías profesionales', icono: 'camera' },
  { id: 's2', titulo: 'Publicación en portales', icono: 'pin' },
  { id: 's3', titulo: 'Gestión de interesados', icono: 'chat' },
];

const BOTTOM_ROW = [
  { id: 's4', titulo: 'Tours virtuales', icono: 'camera' },
  { id: 's5', titulo: 'Agenda de citas', icono: 'calendar' },
  { id: 's6', titulo: 'Reportes y soporte', icono: 'user' },
];

export default function ServiciosMarquee() {
  const topRowItems = TOP_ROW;
  const bottomRowItems = BOTTOM_ROW;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
          ¿Querés vender tu propiedad? Nosotros te ayudamos.
        </H2>
        <P className="mt-4 text-base sm:text-lg text-zinc-700 leading-relaxed">
          Nos encargamos de todo el proceso: desde la publicación y promoción, hasta la atención de interesados y gestión de citas. Estos son los beneficios que recibirás al vender tu propiedad con nosotros
        </P>
      </div>

      <div className="w-full max-w-4xl mx-auto h-[480px] bg-white rounded-xl overflow-hidden px-2 py-8 flex flex-col gap-10">
        <div className="flex-1 flex items-center justify-center">
          <MarqueeRow items={topRowItems} direction="right" speed={18} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <MarqueeRow items={bottomRowItems} direction="left" speed={20} />
        </div>
      </div>
    </section>
  );
}
