import { H2, P } from "@/components/ui/Typography";

export default function OurObjetiveSection() {
  return (
    <section className="w-full py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <img
            src="https://i.ibb.co/PGrYyvVn/objetivo-1.jpg"
            alt="Equipo Rent Me CR"
            className="rounded-2xl w-full h-auto object-cover shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 font-title text-center md:text-left">
          <H2 className="text-3xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800 mb-2">
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


