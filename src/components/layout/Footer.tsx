import * as React from "react";
import { useIcons } from "@/app/context/useIcons";
import { Link } from "@tanstack/react-router";
import { buildWhatsAppHref, SOCIAL_CONFIG } from "@/utils/socialMediaConfig";
import { H2 } from "../ui/Typography";

const WHATSAPP_PHONE = "50683888231";
const FOLLOW_PLATFORMS = ["instagram", "facebook", "tiktok"];

function hrefFromEntry(entry: any) {
  return entry.platform === "whatsapp"
    ? buildWhatsAppHref(entry.phone || "", entry.message)
    : entry.url || "#";
}

function getHrefByPlatform(p: string) {
  const entry = SOCIAL_CONFIG.find((e) => e.platform === p);
  return entry ? hrefFromEntry(entry) : "#";
}

export default function Footer() {
  const Icons = useIcons();
  const promoIcons = SOCIAL_CONFIG;
  const followList = FOLLOW_PLATFORMS
    .map((p) => SOCIAL_CONFIG.find((e) => e.platform === p))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    // Effect removed - icons display without animation
  }, []);

  return (
    <>
      <style>{`
        @keyframes blobA { from { transform: translate(0,0) scale(1); } to { transform: translate(18px,12px) scale(1.03); } }
        @keyframes blobB { from { transform: translate(0,0) scale(1); } to { transform: translate(-14px,-10px) scale(1.02); } }
      `}</style>

      <footer className="relative bg-gradient-to-b from-[#2b4639] via-[#315748] to-[#1b3328] text-white overflow-hidden">
        {/* blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            aria-hidden
            className="absolute top-0 left-0 opacity-8"
            style={{
              width: 300,
              height: 300,
              background: "#3d6b52",
              filter: "blur(48px)",
              borderRadius: "60% 40% 50% 50% / 55% 45% 55% 45%",
              animation: "blobA 10s ease-in-out infinite alternate",
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 opacity-6"
            style={{
              width: 260,
              height: 260,
              background: "#8a7d52",
              filter: "blur(64px)",
              borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
              animation: "blobB 12s ease-in-out infinite alternate",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10 py-6 sm:py-10">
          <div className="grid lg:grid-cols-[1.5fr_2fr] gap-y-4 sm:gap-y-8 lg:gap-y-0 lg:gap-x-12 items-start">

            {/* Brand / Tagline */}
            <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5 pr-0 lg:pr-6">
              <div className="text-xs uppercase tracking-widest text-white/50 font-medium">
                Bienvenido
              </div>

              <H2 className="text-2xl sm:text-4xl font-light tracking-[0.08em] text-white">
                DMR Rentals
              </H2>

              <p className="text-white/95 text-sm sm:text-lg font-normal leading-snug max-w-md">
                Tu aliado confiable en la compra, venta y gestión de propiedades en
                Costa Rica.
              </p>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md">
                Convertimos tu visión inmobiliaria en una experiencia real, segura y
                personalizada.
              </p>

              {/* Social icons */}
              <div className="mt-1">
                <div
                  className="flex items-center gap-2 sm:gap-3"
                  aria-hidden={false}
                >
                  {promoIcons.map((s) => {
                    const Icon = Icons[s.platform as keyof typeof Icons];
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
                        className="flex items-center justify-center h-8 w-8 rounded-md bg-white/6 text-white/70 hover:bg-white/14 hover:text-white"
                      >
                        <Icon size={14} aria-hidden />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Nav + Contacto + Síguenos + Legal */}
            <div className="grid lg:grid-cols-3 gap-y-4 sm:gap-y-8 lg:gap-y-0 lg:gap-x-6">
              
              {/* Navegación + Síguenos (mobile 2 cols) */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                {/* Navegación */}
                <nav aria-label="Páginas principales" className="pt-1">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Navegación
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/" className="text-white/60 hover:text-white transition-colors duration-200">
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link to="/servicios" className="text-white/60 hover:text-white transition-colors duration-200">
                        Servicios
                      </Link>
                    </li>
                    <li>
                      <Link to="/alojamientos" className="text-white/60 hover:text-white transition-colors duration-200">
                        Alojamientos
                      </Link>
                    </li>
                    <li>
                      <Link to="/ventas" className="text-white/60 hover:text-white transition-colors duration-200">
                        Ventas
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* Síguenos (mobile) */}
                <nav aria-label="Síguenos" className="pt-1 lg:hidden">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Síguenos
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {followList.map((s) => {
                      const href = hrefFromEntry(s);
                      const label = s.label ?? s.platform;
                      return (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors duration-200"
                          >
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* Contacto + Legal (mobile 2 cols) */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                {/* Contacto */}
                <nav aria-label="Contáctanos" className="pt-1">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Contacto
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href={buildWhatsAppHref(WHATSAPP_PHONE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        WhatsApp
                      </a>
                    </li>
                    <li>
                      <a
                        href={getHrefByPlatform("instagram")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">
                        Gmail
                      </a>
                    </li>
                    <li>
                      <a
                        href={getHrefByPlatform("facebook")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        Facebook
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Legal (mobile) */}
                <nav aria-label="Legal" className="pt-1 lg:hidden">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Legal
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        to="/terminos-y-condiciones"
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        Términos y condiciones
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Síguenos + Legal (desktop only) */}
              <div className="hidden lg:flex lg:flex-col lg:gap-0">
                {/* Síguenos (desktop) */}
                <nav aria-label="Síguenos" className="pt-1 lg:order-1">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Síguenos
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {followList.map((s) => {
                      const href = hrefFromEntry(s);
                      const label = s.label ?? s.platform;
                      return (
                        <li key={label}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors duration-200"
                          >
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Legal (desktop) */}
                <nav aria-label="Legal" className="pt-1 lg:order-2 lg:mt-8">
                  <h4 className="text-[11px] font-medium uppercase tracking-wider text-white/45 mb-2">
                    Legal
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        to="/terminos-y-condiciones"
                        className="text-white/60 hover:text-white transition-colors duration-200"
                      >
                        Términos y condiciones
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

          </div>

          <div className="mt-2 sm:mt-3 border-t border-white/[0.06]" />

          <div className="mt-2 sm:mt-3 flex items-center justify-between text-white/40 text-xs">
            <div>© {currentYear} DMR Rentals</div>
            <div className="text-white/30">Desarrollado por ChocoTec</div>
          </div>
        </div>
      </footer>
    </>
  );
}