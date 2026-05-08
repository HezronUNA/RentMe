import type { JSX } from "react";
import {
  MapPin,
  MessageCircleMore,
  UserRound,
  Camera,
  CalendarDays,
} from "lucide-react";

const IconByName: Record<string, JSX.Element> = {
  pin: <MapPin className="h-6 w-6" />,
  chat: <MessageCircleMore className="h-6 w-6" />,
  user: <UserRound className="h-6 w-6" />,
  camera: <Camera className="h-6 w-6" />,
  calendar: <CalendarDays className="h-6 w-6" />,
  facebook: (
    <span className="text-xl font-bold">f</span>
  ),
};

interface ServiceCardProps {
  item: { icono?: string; titulo: string };
}

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fbfbfa] shadow-[0_12px_30px_rgba(82,101,91,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.12)] w-64 h-44 flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f7] via-[#fbfbfa] to-[#f5f6f5]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.03),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.18),transparent_42%)]" />

      <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center gap-3">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#52655B] text-white shadow-md">
          {IconByName[item.icono ?? 'pin'] ?? <MapPin className="h-6 w-6" />}
        </div>
        <div className="w-full text-center text-zinc-900 text-base font-medium leading-relaxed">
          {item.titulo}
        </div>
      </div>
    </article>
  );
}
