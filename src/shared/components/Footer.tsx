import * as React from "react";
import { useIcons } from "@/shared/hooks/useIcons";
import { buildWhatsAppHref, type Platform, type SocialEntry } from "@/shared/types/socialMedia";
import { SOCIAL_CONFIG } from "../utils/socialMediaConfig";
import { Link } from "@tanstack/react-router";
import { H2 } from "./Typography";

const WHATSAPP_PHONE = "50683888231";
const FOLLOW_PLATFORMS: Platform[] = ["instagram", "facebook", "tiktok"];


function hrefFromEntry(entry: SocialEntry) {
  return entry.platform === "whatsapp"
    ? buildWhatsAppHref(entry.phone, entry.message)
    : entry.url;
}
function getHrefByPlatform(p: Platform) {
  const entry = SOCIAL_CONFIG.find((e) => e.platform === p);
  return entry ? hrefFromEntry(entry) : "#";
}
export default function Footer() {
  const Icons = useIcons();
  const promoIcons = SOCIAL_CONFIG;
  const followList = FOLLOW_PLATFORMS
    .map((p) => SOCIAL_CONFIG.find((e) => e.platform === p))
    .filter(Boolean) as SocialEntry[];
  const iconsRef = React.useRef<HTMLDivElement | null>(null);
  const [iconsVisible, setIconsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = iconsRef.current;
    if (!el || hasAnimated) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIconsVisible(true);
          setHasAnimated(true);
          obs.disconnect(); 
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasAnimated]);

  return (
 <footer
  className="
    relative bg-[#52655B] text-white border-t border-[#52655B] mt-8"
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div className="grid lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-x-6">
      <div className="lg:col-span-2">
        <H2 className="text-white">
          RENTME CR
        </H2>
        <p className="mt-4 max-w-prose text-white/80 text-sm leading-relaxed">
          Tu aliado confiable en la compra, venta y gestión de propiedades en Costa Rica.
          Convertimos tu visión inmobiliaria en una experiencia real, segura y personalizada.
        </p>

        <div className="mt-8">
          <p className="text-xl text-white/80 font-semibold">
            ¿Dónde promocionamos tu propiedad?
          </p>
          <div ref={iconsRef} className="mt-4 flex items-center gap-4">
            {promoIcons.map((s, idx) => {
              const Icon = Icons[s.platform];
              const href = hrefFromEntry(s);
              const label = s.label ?? s.platform;

              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`
                    grid h-10 w-10 place-items-center rounded-full
                    border border-white/60 ring-1 ring-white/10
                    bg-transparent text-white
                    hover:bg-white hover:text-[#52655B]
                    transition-transform transition-opacity
                    duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${iconsVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-20"}
                  `}
                  style={{
                    transitionDelay: iconsVisible ? `${idx * 180}ms` : "0ms",
                  }}
                >
                  <Icon size={18} aria-hidden />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Páginas principales */}
      <nav aria-label="PÁGINAS PRINCIPALES" className="lg:pr-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
          PÁGINAS PRINCIPALES
        </h4>
        <ul className="mt-3 space-y-3 text-[15px]">
          <li>
            <Link
              href="/"
              to={"."}
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/servicios"
              to={"."}
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="/alojamientos"
              to={"."}
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
            >
              Alojamientos
            </Link>
          </li>
          <li>
            <Link
              href="/ventas"
              to={"."}
              className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
            >
              Ventas
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contacto + Síguenos */}
      <div className="grid grid-cols-2 gap-5 lg:ml-0">
        <nav aria-label="CONTÁCTANOS">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            CONTÁCTANOS
          </h4>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a
                href={buildWhatsAppHref(WHATSAPP_PHONE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={getHrefByPlatform("instagram")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
              >
                Gmail
              </a>
            </li>
            <li>
              <a
                href={getHrefByPlatform("facebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="SÍGUENOS">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            SÍGUENOS
          </h4>
          <ul className="mt-4 space-y-3 text-[15px]">
            {followList.map((s) => {
              const href = hrefFromEntry(s);
              const label = s.label ?? s.platform;
              return (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>

    <div className="relative mt-12 mb-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/20"></div>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-sm text-white/80 mb-1 font-medium">
        © 2025 RentME CR. Todos los derechos reservados.
      </p>
      <p className="text-xs font-semibold text-[#94a593]">
        Desarrollado por ChocoTec
      </p>
    </div>
  </div>
  <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#94a593]/70 to-transparent"></div>
</footer>

  );
}