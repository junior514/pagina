import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TopicsMarquee } from "@/components/home/TopicsMarquee";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { AboutStats } from "@/components/home/AboutStats";
import { Methodology } from "@/components/home/Methodology";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCta } from "@/components/home/ContactCta";
import { slides } from "@/data/slides";
import { PhotoRevealZone } from "@/components/home/PhotoRevealZone";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={slides} />
      <TopicsMarquee />
      <PhotoRevealZone>
        <FeaturedCourses />
        <AboutStats />
      </PhotoRevealZone>
      <Methodology />
      <Testimonials />
      <ContactCta />
    </>
  );
}
