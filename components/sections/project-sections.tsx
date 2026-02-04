'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: { name: string; icon: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Taller MTS',
    description:
      'Sistema integral de gestión para taller mecánico, clientes, seguros e inventario. Optimiza la operación del taller, la experiencia del cliente y el control financiero en un solo lugar.',
    images: [
      '/projects/Taller%20MST/1.png',
      '/projects/Taller%20MST/2.png',
      '/projects/Taller%20MST/3.png',
      '/projects/Taller%20MST/4.png',
      '/projects/Taller%20MST/5.jpg',
      '/projects/Taller%20MST/6.jpg',
    ],
    technologies: [
      { name: 'React', icon: '/tech/react_dark.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.svg' },
      { name: 'Vite', icon: '/tech/vite.svg' },
      { name: 'Tailwind CSS', icon: '/tech/tailwindcss.svg' },
      { name: 'React Router', icon: '/tech/reactrouter.svg' },
      { name: 'TanStack Query', icon: '/tech/tanstack.svg' },
      { name: 'Zustand', icon: '/tech/zustand-original.svg' },
      { name: 'Radix UI', icon: '/tech/shadcn-ui_dark.svg' },
    ],
    liveUrl: 'https://tallermst.netlify.app/',
    githubUrl: 'https://github.com/DylanA0110/mts',
  },
  {
    id: 2,
    title: 'Floristería Sacuanjoche',
    description:
      'Sistema de gestión y catálogo para floristería: arreglos, inventario, pedidos, facturación, clientes y reportes. Incluye soporte para manejo de imágenes con Supabase.',
    images: [
      '/projects/Sacuanjoche/1.png',
      '/projects/Sacuanjoche/2.png',
      '/projects/Sacuanjoche/3.png',
      '/projects/Sacuanjoche/4.png',
      '/projects/Sacuanjoche/5.png',
      '/projects/Sacuanjoche/7.png',
      '/projects/Sacuanjoche/8.png',
      '/projects/Sacuanjoche/9.png',
      '/projects/Sacuanjoche/10.png',
      '/projects/Sacuanjoche/11.png',
    ],
    technologies: [
      { name: 'React', icon: '/tech/react_dark.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.svg' },
      { name: 'Vite', icon: '/tech/vite.svg' },
      { name: 'Tailwind CSS', icon: '/tech/tailwindcss.svg' },
      { name: 'React Router', icon: '/tech/reactrouter.svg' },
      { name: 'TanStack Query', icon: '/tech/tanstack.svg' },
      { name: 'Zustand', icon: '/tech/zustand-original.svg' },
      { name: 'Radix UI', icon: '/tech/shadcn-ui_dark.svg' },
      { name: 'Supabase', icon: '/tech/supabase.svg' },
    ],
    liveUrl: 'https://sacuanjoche.netlify.app',
    githubUrl: 'https://github.com/DylanA0110/sacuanjoche-fronted',
  },
];

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const currentProject = projects[activeProject];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
    setActiveImage(0);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    setActiveImage(0);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % currentProject.images.length);
  };

  const prevImage = () => {
    setActiveImage(
      (prev) =>
        (prev - 1 + currentProject.images.length) %
        currentProject.images.length,
    );
  };

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden scroll-mt-24 md:scroll-mt-28"
      id="projects"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/5 to-background" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 text-balance">
            Proyectos <span className="text-primary">Destacados</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Una muestra de mi trabajo más reciente que combina creatividad con
            tecnología de vanguardia
          </p>
        </motion.div>

        {/* Project Card */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border border-border/50 backdrop-blur-sm bg-card/50">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-3 sm:p-6 md:p-8">
                  {/* Image Carousel */}
                  <div className="relative aspect-video max-h-60 sm:max-h-none rounded-lg overflow-hidden bg-muted/10 p-1 sm:p-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={
                            currentProject.images[activeImage] ||
                            '/placeholder.svg'
                          }
                          alt={`${currentProject.title} captura ${activeImage + 1}`}
                          fill
                          className="object-contain rounded-md"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          priority={activeImage === 0}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Image Navigation */}
                    {currentProject.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background border border-border/40 backdrop-blur h-8 w-8 sm:h-10 sm:w-10"
                          onClick={prevImage}
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background border border-border/40 backdrop-blur h-8 w-8 sm:h-10 sm:w-10"
                          onClick={nextImage}
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {currentProject.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImage(idx)}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                                idx === activeImage
                                  ? 'bg-primary w-8'
                                  : 'bg-muted-foreground/30'
                              }`}
                              aria-label={`Ver imagen ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col justify-between min-w-0">
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-balance">
                          {currentProject.title}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                          {currentProject.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3 uppercase tracking-wide">
                          Tecnologías
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech) => (
                            <motion.div
                              key={tech.name}
                              className="shrink-0 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-[11px] sm:text-sm font-medium inline-flex items-center gap-2"
                              whileHover={{
                                scale: 1.05,
                                borderColor: 'hsl(var(--primary))',
                                backgroundColor: 'hsl(var(--primary) / 0.15)',
                              }}
                            >
                              <Image
                                src={tech.icon}
                                alt={`${tech.name} logo`}
                                width={16}
                                height={16}
                                className="shrink-0"
                              />
                              <span>{tech.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      {currentProject.liveUrl && (
                        <Button
                          className="w-full sm:flex-1 group"
                          size="default"
                          asChild
                        >
                          <a
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="mr-2">Ver demo</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </Button>
                      )}
                      {currentProject.githubUrl && (
                        <Button
                          variant="outline"
                          size="default"
                          className="w-full sm:flex-1 group bg-transparent"
                          asChild
                        >
                          <a
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            <span>Código fuente</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Project Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={prevProject}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveProject(idx);
                    setActiveImage(0);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeProject
                      ? 'bg-primary w-10'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Ver proyecto ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={nextProject}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
