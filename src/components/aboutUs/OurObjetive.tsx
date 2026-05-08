import { H2, P } from "@/components/ui/Typography";

export default function OurObjetiveSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-7rem] top-16 h-[18rem] w-[18rem] rounded-full bg-[#e7eee9]/35 blur-[75px] md:left-[-9rem] md:top-20 md:h-[28rem] md:w-[28rem] md:bg-[#e7eee9]/50 md:blur-[100px]" />
        <div className="absolute right-[-7rem] top-16 h-[18rem] w-[18rem] rounded-full bg-[#f1e8dc]/35 blur-[75px] md:right-[-9rem] md:top-20 md:h-[28rem] md:w-[28rem] md:bg-[#f1e8dc]/50 md:blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <img
            src="https://i.ibb.co/PGrYyvVn/objetivo-1.jpg"
            alt="Equipo Rent Me CR"
            className="rounded-2xl w-full h-auto object-cover shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 font-title text-center md:text-left">
          <H2 className="mb-2">
            Nuestro Objetivo
          </H2>
          <P className="text-gray-700 text-sm sm:text-lg font-body">
           En DMR Rentals, cuidamos su alojamiento como si fuera nuestro. Queremos ayudarle a sacar el maximo provecho, atrayendo a los mejores huespedes y ofreciendoles una experiencia inolvidable
          </P>
        </div>
      </div>
    </section>
  );
}


