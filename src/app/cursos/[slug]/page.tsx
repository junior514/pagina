import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courses";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { CourseCard } from "@/components/courses/CourseCard";
import { EnrollCard, Syllabus } from "@/components/courses/CourseDetailParts";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";

type Params = { slug: string };

// Todas las páginas de curso se generan como HTML estático en el build.
export function generateStaticParams(): Params[] {
  return courses.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: `/cursos/${course.slug}` },
    openGraph: { title: course.title, description: course.summary, images: [course.image] },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const related = courses.filter((c) => c.slug !== course.slug && c.category === course.category).concat(
    courses.filter((c) => c.slug !== course.slug && c.category !== course.category),
  ).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url },
  };

  return (
    <>
      <PageHero
        eyebrow={course.category}
        title={course.title}
        text={course.summary}
        image={course.image}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Cursos", href: "/cursos" }, { label: course.title }]}
      />

      <section className="bg-mist py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <Reveal once>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Lo que aprenderás</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.learn.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-volt text-ink">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal once>
              <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">Temario</h2>
              <Syllabus syllabus={course.syllabus} />
            </Reveal>
          </div>

          <div>
            <EnrollCard course={course} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="text-2xl font-extrabold sm:text-4xl">Otros cursos que te pueden interesar</h2>
            </Reveal>
            <Link href="/cursos" className="btn btn-dark group hidden shrink-0 sm:inline-flex">
              Ver más cursos <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Stagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </Stagger>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
