import { H2, P } from "@/shared/components/Typography";
import type { MiembroEquipo } from "../type";

type Props = {
    members: MiembroEquipo[];
    activeId: string | null;
    toggleMember: (id: string) => void;
};

export default function MobileOurTeam({ members, activeId, toggleMember }: Props) {
    return (
        <section className="sm:hidden w-full pb-20">
            <div className="mx-auto max-w-[1400px] px-4 py-16">
                {/* Título con estilo de Nuestro Objetivo */}
                <div className="text-center mb-12">
                    <H2 className="text-2xl md:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
                        Conoce a nuestro equipo de trabajo
                    </H2>
                </div>

                {/* Contenedor de cards */}
                <div className="mt-8 flex flex-wrap justify-center gap-8">
                    {members.map((m) => (
                        <article
                            key={m.id}
                            onClick={() => toggleMember(m.id)}
                            className="group relative w-[280px] overflow-hidden bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm transition-all duration-300 cursor-pointer"
                        >
                            {/* Contenido Principal */}
                            <div className="p-6 flex flex-col items-center gap-4">
                                <div className="relative w-full h-60 overflow-hidden rounded-[6px]">
                                    <img
                                        src={m.fotoURL}
                                        alt={m.nombre}
                                        loading="lazy"
                                        className="w-full h-full object-cover bg-white"
                                    />
                                </div>

                                <div className="w-full flex flex-col items-center gap-2.5">
                                    <P className="text-center text-zinc-800 text-xl font-medium [&:not(:first-child)]:mt-0">
                                        {m.nombre}
                                    </P>
                                    <P className="text-center text-zinc-600 text-base [&:not(:first-child)]:mt-0">
                                        {m.rol}
                                    </P>
                                </div>
                            </div>

                            {/* Overlay con descripción */}
                            <div className={`absolute inset-0 bg-white flex items-center justify-center p-6 transition-all duration-500 ease-out 
                                ${activeId === m.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                                <P className="text-center text-zinc-800 text-base leading-relaxed">
                                    {m.descripcion || 'No hay descripción disponible'}
                                </P>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
