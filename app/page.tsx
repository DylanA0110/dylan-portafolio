import { Navbar } from '@/components/shared/navbar';

import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/sections/hero-sections';
import { AboutSection } from '@/components/sections/about-sections';
import { ProjectsSection } from '@/components/sections/project-sections';
import { BlogSection } from '@/components/sections/blog-sections';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
