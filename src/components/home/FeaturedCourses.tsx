import Link from "next/link";
import { getFeaturedCourses } from "@/data/courses";
import { CourseCard } from "@/components/courses/CourseCard";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function FeaturedCourses() {
  const featured = getFeaturedCourses(4);

  return (
    <section id="cursos" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Cursos principales</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
              Formación técnica que <span className="text-volt">te pone a trabajar</span>
            </h2>
            <p className="mt-4 text-white/80">
              Programas prácticos diseñados con la industria: aprende haciendo en laboratorio y obtén tu certificado.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.15}>
            <Link href="/cursos" className="btn btn-ghost group hidden md:inline-flex">
              Ver más cursos
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" stagger={0.12}>
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </Stagger>

        <Reveal className="mt-14 flex justify-center">
          <Link href="/cursos" className="btn btn-primary shine group px-8 py-4 text-base">
            Ver todos los cursos
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
