// src/slices/services/sections/salesService/components/ServiceCard.tsx
import type { JSX } from "react";
import {
  MapPin,
  MessageCircleMore,
  UserRound,
  Camera,
  CalendarDays,
} from "lucide-react";
import type { ServiceItem } from "../../../hooks/useSalesServices";

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
  item: ServiceItem;
}

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <div className="group w-64 h-44 bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col items-center justify-center gap-4 flex-shrink-0 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
        {IconByName[item.icono] ?? <MapPin className="h-6 w-6" />}
      </div>
      <div className="w-full text-center text-zinc-900 text-base font-medium leading-relaxed">
        {item.titulo}
      </div>
    </div>
  );
}