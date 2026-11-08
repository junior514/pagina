import type { Metadata } from "next";
import { categories, courses } from "@/data/courses";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Todos los cursos",
  description:
    "Catálogo completo de cursos de electricidad, tableros eléctricos, PLC, automatización, energía solar y seguridad eléctrica.",
  alternates: { canonical: "/cursos" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Todos nuestros"
        highlight="cursos"
        text="Encuentra el programa ideal para tu nivel: desde electricidad básica hasta automatización industrial avanzada."
        image="/images/hero/subestacion.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Cursos" }]}
      />
      <section className="bg-mist py-16 sm:py-24">
        <div className="container-x">
          <CourseCatalog courses={courses} categories={categories} />
        </div>
      </section>
      <ContactCta title="¿No sabes qué curso elegir?" />
    </>
  );
}
