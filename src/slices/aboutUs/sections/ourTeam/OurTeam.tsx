import { useOurTeam } from "../../hooks/useOurTeam";
import { H2, P } from "@/shared/components/Typography";

export default function OurTeam() {
    const { data: members = [], isLoading: loading, activeId, toggleMember } = useOurTeam();

    return (
        <section className="w-full pb-32">
            <div className="mx-auto max-w-[1400px] px-4 py-16">
                {/* Título con estilo de Nuestro Objetivo */}
                <div className="max-w-6xl mx-auto text-center md:text-center">
                    <H2 className="text-3xl md:text-4xl font-regular uppercase mb-4 font-title">
                        Conoce a nuestro equipo de trabajo
                    </H2>
                </div>

                {/* Contenedor de cards */}
                <div className="mt-8 sm:mt-10 md:mt-14 flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-20 xl:gap-32">
                    {loading && (
                        <div className="text-neutral-500 w-full text-center">Cargando equipo…</div>
                    )}

                    {!loading && members.length === 0 && (
                        <div className="text-neutral-500 w-full text-center">Aún no hay miembros.</div>
                    )}

                    {members.map((m) => (
                        <article
                            key={m.id}
                            onClick={() => toggleMember(m.id)}
                            className="group relative w-[320px] overflow-hidden bg-neutral-50 rounded-[10px] shadow-[0px_0px_8px_4px_rgba(0,0,0,0.25)] outline outline-zinc-600 outline-offset-[-1px] transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer sm:cursor-default"
                        >
                            {/* Contenido Principal */}
                            <div className="p-6 flex flex-col items-center gap-4">
                                <div className="relative w-full h-72 overflow-hidden rounded-[6px]">
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
                            <div className={`absolute inset-0 bg-white flex items-center justify-center p-6 transition-all duration-300 ease-in-out 
                                ${activeId === m.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'} 
                                sm:opacity-0 sm:translate-y-full sm:group-hover:opacity-100 sm:group-hover:translate-y-0 
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
