import { H2, P } from "@/components/ui/Typography";

export default function Intro() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-[-12rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[#e7eee9]/35 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[2rem] h-[26rem] w-[26rem] rounded-full bg-[#f1e8dc]/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
              Experiencias curadas
            </p>

            <H2 className="max-w-xl text-[#2f3a35] normal-case tracking-normal leading-tight text-2xl md:text-3xl lg:text-4xl">
              Vive experiencias inolvidables, con un estilo más humano y más libre.
            </H2>
          </div>

          <div className="space-y-4 max-w-2xl">
            <P className="text-lg md:text-xl leading-8 text-gray-700">
              Nuestros tours están pensados para ir más allá de lo típico: naturaleza, cultura y aventura se combinan en una propuesta más rica, más cálida y mucho más memorable.
            </P>
            <P className="text-base md:text-lg leading-7 text-gray-600">
              Trabajamos con guías expertos, grupos reducidos y una logística cuidada para que cada salida se sienta auténtica, cómoda y bien resuelta de principio a fin.
            </P>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Guías expertos",
                text: "Acompañamiento profesional en cada ruta.",
              },
              {
                title: "Grupos pequeños",
                text: "Más atención, menos ruido, mejor experiencia.",
              },
              {
                title: "Transporte incluido",
                text: "Sin complicaciones, solo disfrutar.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#52655B]/10 bg-white/80 p-5 shadow-[0_12px_30px_rgba(82,101,91,0.08)] backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#52655B]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl overflow-visible">
          <div className="absolute -left-8 top-6 z-0 h-24 w-24 rounded-full border border-[#52655B]/20" />
          <div className="absolute -right-16 -bottom-16 z-0 h-72 w-72 rounded-full border border-[#d9d9d9]/60 bg-transparent" />

          <div className="relative z-10 overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_24px_60px_rgba(47,58,53,0.14)]">
            <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between rounded-full bg-black/25 px-4 py-2 text-white backdrop-blur-md">
              <span className="text-xs font-medium uppercase tracking-[0.25em]">
                Costa Rica alive
              </span>
              <span className="text-xs font-medium">Curated trips</span>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-[1.5rem]">
              <img
                src="https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206453/photo-1526772662000-3f88f10405ff_dyto5x.avif"
                alt="Experiencias de tours en Costa Rica"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                  Aventura + Naturaleza + Cultura
                </div>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/90">
                  Una experiencia visual más cálida, diseñada para invitar a descubrir sin sentir una ruptura entre secciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
