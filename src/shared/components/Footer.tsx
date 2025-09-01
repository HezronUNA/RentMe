import * as React from "react";
import { useIcons } from "@/shared/hooks/useIcons";
import { buildWhatsAppHref, type Platform, type SocialEntry } from "@/shared/types/socialMedia";
import { SOCIAL_CONFIG } from "../utils/socialMediaConfig";
import { Link } from "@tanstack/react-router";

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
        relative bg-white text-black border-t border-black/10 mt-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
        <div className="grid lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-x-6">
    
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-semibold tracking-tight">RENTME CR</h3>
            <p className="mt-4 max-w-prose text-sm leading-relaxed">
              Tu aliado confiable en la compra, venta y gestión de propiedades en Costa Rica.
              Convertimos tu visión inmobiliaria en una experiencia real, segura y personalizada.
            </p>

            <div className="mt-8">
              <p className="text-xl font-semibold">¿Dónde promocionamos tu propiedad?</p>
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
                        border border-black/40 ring-1 ring-black/10
                        bg-white text-black
                        hover:bg-black hover:text-white
                        will-change-transform will-change-opacity
                        transition-transform transition-opacity
                        duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                        motion-reduce:transition-none motion-reduce:transform-none
                        ${iconsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
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
          <nav aria-label="PÁGINAS PRINCIPALES" className="lg:pr-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
              PÁGINAS PRINCIPALES
            </h4>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li><Link href="/" className="hover:underline underline-offset-4" to={"."}>Inicio</Link></li>
              <li><Link href="/servicios" className="hover:underline underline-offset-4" to={"."}>Servicios</Link></li>
              <li><Link href="/alojamientos" className="hover:underline underline-offset-4" to={"."}>Alojamientos</Link></li>
              <li><Link href="/ventas" className="hover:underline underline-offset-4" to={"."}>Ventas</Link></li>
            </ul>
          </nav>
          <div className="grid grid-cols-2 gap-5 lg:ml-0">
            {/* CONTÁCTANOS */}
            <nav aria-label="CONTÁCTANOS">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
                CONTÁCTANOS
              </h4>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <a
                    href={buildWhatsAppHref(WHATSAPP_PHONE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={getHrefByPlatform("instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  {/* Cambia por tu correo real */}
                  <a href="#" className="hover:underline underline-offset-4">Gmail</a>
                </li>
                <li>
                  <a
                    href={getHrefByPlatform("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </nav>

            {/* SÍGUENOS */}
            <nav aria-label="SÍGUENOS">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-black/70">
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
                        className="hover:underline underline-offset-4"
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
        <div className="mt-10 flex justify-end">
          <p className="text-xs font-semibold text-black/80">
            Todos los derechos reservados por ChocoTec
          </p>
        </div>
      </div>
    </footer>
  );
}