import ButtonLogin from "../../shared/components/ButtonLogin";

export default function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Rent Me CR</h1>
      <p>
        No solo administramos tu propiedad, creamos experiencias inolvidables para los huéspedes
        y tranquilidad para los propietarios.
      </p>
      <ButtonLogin />
    </section>
  )
}
