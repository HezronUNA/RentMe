import { H2, P } from "@/shared/components/Typography";
import type { MiembroEquipo } from "../type";

type Props = {
    members: MiembroEquipo[];
    toggleMember: (id: string) => void;
};

export default function DesktopOurTeam({ members, toggleMember }: Props) {
    return (
        <section className="hidden sm:block w-full pb-20">
            <div className="mx-auto max-w-[1400px] px-4 py-16">
                {/* Título con estilo de Nuestro Objetivo */}
                <div className="text-center mb-12">
                    <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
                        Conoce a nuestro equipo de trabajo
                    </H2>
                </div>

                {/* Contenedor de cards */}
                <div className="mt-8 sm:mt-10 md:mt-14 flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-20 xl:gap-32">
                    {members.map((m) => (
                        <article
                            key={m.id}
                            onClick={() => toggleMember(m.id)}
                            className="group relative w-[300px] md:w-[320px] overflow-hidden bg-neutral-50 rounded-[10px] shadow-[0px_0px_6px_2px_rgba(0,0,0,0.15)] outline outline-zinc-600 outline-offset-[-1px] transform hover:-translate-y-1 transition-all duration-500 ease-out cursor-default"
                        >
                            {/* Contenido Principal */}
                            <div className="p-6 flex flex-col items-center gap-4">
                                <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-[6px]">
                                    <img
                                        src={m.fotoURL}
                                        alt={m.nombre}
                                        loading="lazy"
                                        className="w-full h-full object-cover bg-white"
                                    />
                                </div>

                                <div className="w-full flex flex-col items-center gap-2.5">
                                    <P className="text-center text-zinc-800 text-xl sm:text-2xl font-medium [&:not(:first-child)]:mt-0">
                                        {m.nombre}
                                    </P>
                                    <P className="text-center text-zinc-600 text-base sm:text-lg [&:not(:first-child)]:mt-0">
                                        {m.rol}
                                    </P>
                                </div>
                            </div>

                            {/* Overlay con descripción */}
                            <div className={`absolute inset-0 bg-white flex items-center justify-center p-6 transition-all duration-500 ease-out 
                                opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
                                pointer-events-none group-hover:pointer-events-auto`}>
                                <P className="text-center text-zinc-800 text-lg leading-relaxed">
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
