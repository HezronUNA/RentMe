import React from "react";
import { useIcons } from "@/shared/hooks/useIcons";
import { useFooterData } from "@/shared/hooks/useFooterData";
import { buildWhatsAppHref } from "@/shared/types/socialMedia";
import { Link } from "@tanstack/react-router";
import { RollingText } from "./Rolling";

export default function Footer() {
  const { data, isLoading, error } = useFooterData();
  const Icons = useIcons();
  const [iconsVisible, setIconsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const iconsRef = React.useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasAnimated]);

  if (isLoading)
    return (
      <footer className="bg-[#52655B] text-white py-10 text-center">
        Cargando footer...
      </footer>
    );
  if (error || !data)
    return (
      <footer className="bg-[#52655B] text-white py-10 text-center">
        Error cargando footer
      </footer>
    );

  return (
    <footer className="relative bg-[#52655B] text-white border-t border-[#52655B] mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-x-6">
          {/* Brand y descripción */}
          <div className="lg:col-span-2">
            <h3 className="text-4xl text-white font-semibold tracking-tight uppercase">
              <RollingText text={data.brand} />
            </h3>
            <p className="mt-4 max-w-prose text-white/80 text-sm leading-relaxed">
              {data.descripcion}
            </p>

            {/* Bloque de promoción + íconos sociales */}
            <div className="mt-8">
              <p className="text-xl text-white/80 font-semibold">
                {data.promocionTitulo}
              </p>
              <div ref={iconsRef} className="mt-4 flex items-center gap-4">
                {data.siguenos && typeof data.siguenos === "object"
                  ? Object.entries(data.siguenos).map(([platform, url], idx) => {
                      const key = platform.toLowerCase() as keyof typeof Icons;
                      const Icon = Icons && Icons[key];
                      if (Icon) {
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={platform}
                            title={platform}
                            className={`
                              grid h-10 w-10 place-items-center rounded-full
                              border border-white/60 ring-1 ring-white/10
                              bg-transparent text-white
                              hover:bg-white hover:text-[#52655B]
                              will-change-transform will-change-opacity
                              transition-transform transition-opacity
                              duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                              motion-reduce:transition-none motion-reduce:transform-none
                              ${iconsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                            `}
                            style={{
                              transitionDelay: iconsVisible
                                ? `${idx * 150}ms`
                                : "0ms",
                            }}
                          >
                            <Icon size={20} aria-hidden />
                          </a>
                        );
                      }
                      // Fallback si no hay ícono definido
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white transition-colors"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>

          {/* Navegación principal */}
          <nav aria-label="PÁGINAS PRINCIPALES" className="lg:pr-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              PÁGINAS PRINCIPALES
            </h4>
            <ul className="mt-3 space-y-3 text-[15px]">
              {data.paginasPrincipales &&
                Object.entries(data.paginasPrincipales).map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      to={"."}
                      className="inline-flex items-center rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-[#94a593]/20 hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Contacto y Síguenos */}
          <div className="grid grid-cols-2 gap-5 lg:ml-0">
            {/* Contacto */}
            <nav aria-label="CONTÁCTANOS">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                CONTÁCTANOS
              </h4>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <a
                    href={
                      data.contactoWhatsapp
                        ? buildWhatsAppHref(data.contactoWhatsapp)
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={data.contactoInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={data.contactoGmail ? `mailto:${data.contactoGmail}` : "#"}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white transition-colors"
                  >
                    Gmail
                  </a>
                </li>
                <li>
                  <a
                    href={data.contactoFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm hover:bg-[#94a593]/20 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </nav>

            {/* Síguenos - ahora con íconos también */}
            <nav aria-label="SÍGUENOS">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                SÍGUENOS
              </h4>
              <ul className="mt-4 space-y-3 text-[15px]">
                {data.siguenos && Object.entries(data.siguenos).map(([platform, url]) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-[#94a593]/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#94a593]"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="relative mt-12 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/80 mb-1 font-medium">
            {data?.copyright ||
              `© 2025 RentME CR. Todos los derechos reservados.`}
          </p>
          <p className="text-xs font-semibold text-[#94a593]">
            {data?.desarrolladoPor || `Desarrollado por ChocoTec`}
          </p>
        </div>
      </div>
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#94a593]/70 to-transparent"></div>
    </footer>
  );
}
