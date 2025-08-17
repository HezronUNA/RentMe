import { SOCIAL_CONFIG } from "@/shared/utils/socialMediaConfig"
import { buildWhatsAppHref } from "@/shared/types/socialMedia"
import { useIcons } from "../hooks/useIcons"

export default function SocialBar() {
  const Icons = useIcons()

  return (
    <aside
      className="
        fixed right-4 top-1/2 -translate-y-1/2 z-50
        flex flex-col gap-3
        animate-in fade-in slide-in-from-right-4 duration-700
      "
      aria-label="Barra de redes sociales"
    >
      {SOCIAL_CONFIG.map((entry) => {
        const label = entry.label ?? entry.platform
        const href =
          entry.platform === "whatsapp"
            ? buildWhatsAppHref(entry.phone, entry.message)
            : entry.url

        const Icon = Icons[entry.platform]

        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label} /* fallback nativo */
            className={`
              group relative grid place-items-center
              ${entry.bg} text-white rounded-full
              w-12 h-12 shadow-lg
              transition-transform duration-200
              hover:scale-110 focus:scale-110
              focus:outline-none focus:ring-2 focus:ring-white/60
            `}
            aria-label={label}
          >
            <Icon size={20} aria-hidden />

            {/* Tooltip custom */}
            <span
              className="
                pointer-events-none absolute right-full mr-3
                whitespace-nowrap rounded-md bg-black/80 text-white text-xs px-2 py-1
                opacity-0 translate-x-2
                transition-all duration-200
                group-hover:opacity-100 group-hover:translate-x-0
                group-focus:opacity-100 group-focus:translate-x-0
              "
              role="tooltip"
            >
              {label}
            </span>

            {/* Halo animado */}
            <span
              className="
                absolute inset-0 rounded-full
                ring-0 ring-white/40
                transition-all duration-300
                group-hover:ring-8 group-focus:ring-8
              "
              aria-hidden
            />
          </a>
        )
      })}
    </aside>
  )
}
