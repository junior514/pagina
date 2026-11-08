import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-circuit flex min-h-[80vh] items-center bg-ink pt-24 text-white">
      <div className="container-x text-center">
        <p className="font-display text-8xl font-extrabold text-volt sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">Este circuito está abierto</h1>
        <p className="mt-3 text-white/60">La página que buscas no existe o fue movida.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">Ir al inicio</Link>
          <Link href="/cursos" className="btn btn-ghost">Ver cursos</Link>
        </div>
      </div>
    </section>
  );
}
