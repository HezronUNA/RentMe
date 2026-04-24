export default function TermsAndConditionsPage() {
  return (
    <main className="px-4 py-10 md:px-6 md:py-14">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 text-left">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            Términos y Condiciones
          </h1>
          <p className="text-sm font-medium text-zinc-500">
            Última actualización: 24 de abril de 2026.
          </p>
          <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
            Estos términos y condiciones regulan el uso del sitio web de DMR Rentals y
            de los servicios relacionados con alojamientos, servicios adicionales,
            propiedades en venta y otras funcionalidades disponibles en la plataforma.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Aceptación de los términos
          </h2>
          <p className="text-base leading-relaxed text-zinc-700">
            Al navegar, registrarte o utilizar este sitio, aceptas cumplir estos
            términos y condiciones. Si no estás de acuerdo con alguna parte de este
            documento, te recomendamos no utilizar la plataforma.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Uso de la información registrada
          </h2>
          <p className="text-base leading-relaxed text-zinc-700">
            Los datos personales que se registren en DMR Rentals serán utilizados
            únicamente para la operación de la plataforma, incluyendo:
          </p>
          <ul className="list-inside list-disc text-base leading-relaxed text-zinc-700">
            <li>Gestión de reservaciones de alojamientos.</li>
            <li>Gestión de reservaciones de servicios.</li>
            <li>Atención de intereses en propiedades en venta.</li>
            <li>Comunicación con clientes sobre solicitudes y soporte.</li>
            <li>Mejora de la experiencia de uso y seguridad del sistema.</li>
          </ul>
          <p className="text-base leading-relaxed text-zinc-700">
            DMR Rentals no hará uso malintencionado de los datos de sus clientes.
            Nuestro compromiso es tratar la información de forma responsable, segura
            y conforme a la finalidad para la cual fue proporcionada.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Responsabilidades del usuario
          </h2>
          <p className="text-base leading-relaxed text-zinc-700">
            Como usuario, te comprometes a proporcionar información veraz, actualizada
            y completa. También te comprometes a no realizar actividades que afecten el
            funcionamiento, la seguridad o la integridad de la plataforma.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Disponibilidad de servicios
          </h2>
          <p className="text-base leading-relaxed text-zinc-700">
            DMR Rentals realizará esfuerzos razonables para mantener la disponibilidad
            del sitio y de sus servicios. Sin embargo, pueden existir interrupciones
            temporales por mantenimiento, actualizaciones o factores externos.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">Modificaciones</h2>
          <p className="text-base leading-relaxed text-zinc-700">
            DMR Rentals podrá actualizar estos términos y condiciones cuando sea
            necesario. Cualquier cambio será publicado en esta misma página con su
            fecha de actualización correspondiente.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-zinc-900">Contacto</h2>
          <p className="text-base leading-relaxed text-zinc-700">
            Si tienes dudas sobre estos términos y condiciones, puedes comunicarte con
            el equipo de DMR Rentals por los canales oficiales de contacto publicados
            en la plataforma.
          </p>
        </section>
      </article>
    </main>
  );
}
