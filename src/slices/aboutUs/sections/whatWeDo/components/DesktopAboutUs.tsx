// src/features/about/ui/DesktopAboutUs.tsx
import { H2, H3, P } from "@/shared/components/Typography";
import type { AboutSection } from "../type";
import type { LucideIcon } from "lucide-react";

type Props = {
  header: AboutSection;
  cards: AboutSection[];   // Espera 5 tarjetas
  icons: LucideIcon[];     // Al menos 5 íconos
};

const Card = ({ card, Icon }: { card: AboutSection; Icon: LucideIcon }) => (
  <article
    className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300"
  >
    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>

    <div className="space-y-2">
      <H2 className="text-zinc-700 text-xl font-medium">
        {card.title}
      </H2>
      <P className="text-zinc-900 text-base leading-relaxed">
        {card.subtitle}
      </P>
    </div>
  </article>
);

export default function DesktopAboutUs({ header, cards, icons }: Props) {
  // guardas mínimos para evitar crashes si falta algo
  if (!header || cards.length === 0) return null;

  const safeIcon = (i: number) => icons[i] ?? icons[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
          {header.title}
        </H2>
        <P className="mt-4 text-base sm:text-lg text-zinc-700 leading-relaxed">
          {header.subtitle}
        </P>
      </div>

      {/* Grid: en desktop (lg) 3 columnas. 
          Card 3 ocupa 2 columnas en la 2da fila (mismo alto que card 5). */}
      <div className="grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Fila 1: 1, 2, 4 */}
        {cards[0] && (
          <div className="lg:col-start-1 lg:row-start-1">
            <Card card={cards[0]} Icon={safeIcon(0)} />
          </div>
        )}

        {cards[1] && (
          <div className="lg:col-start-2 lg:row-start-1">
            <Card card={cards[1]} Icon={safeIcon(1)} />
          </div>
        )}

        {cards[3] && (
          <div className="lg:col-start-3 lg:row-start-1">
            <Card card={cards[3]} Icon={safeIcon(3)} />
          </div>
        )}

        {/* Fila 2: 3 (col-span-2), 5 */}
        {cards[2] && (
          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2 h-full">
            <Card card={cards[2]} Icon={safeIcon(2)} />
          </div>
        )}

        {cards[4] && (
          <div className="lg:col-start-3 lg:row-start-2 h-full">
            <Card card={cards[4]} Icon={safeIcon(4)} />
          </div>
        )}
      </div>
    </section>
  );
}
