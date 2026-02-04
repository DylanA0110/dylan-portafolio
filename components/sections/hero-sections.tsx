'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';

import { SpiderWebPattern } from '@/components/graphics/spider-web-pattern';
import { BlobRevealImage } from '@/components/effects/blob-reveal-image';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-[#0a0f1a] via-black to-black">
      {/* Spider Web SVG Pattern */}
      <SpiderWebPattern className="absolute inset-0 opacity-10" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                DYLAN-ARAICA
              </motion.h1>

              {/* Subtitle with Script Font */}
              <motion.p
                className="font-script text-2xl sm:text-3xl md:text-4xl text-primary mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Frontend Developer
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Desarrollador Frontend metido de lleno en el ecosistema de React.
              Uso Next.js y TS para transformar ideas complejas en experiencias
              web fluidas y con un impacto visual potente. Si se ve bien y
              funciona rápido, ahí es.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] transition-all duration-300"
                asChild
              >
                <a href="/#projects">VER PROYECTOS</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-105 lg:h-105">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Blob Reveal (base = spiderman, reveal = your identity) */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-[0_0_50px_rgba(255,0,0,0.5)]">
                <BlobRevealImage
                  baseSrc="/images/Mask.jpg"
                  revealSrc="/images/Perfil.jpg"
                  alt="Dylan Araica"
                  className="h-full w-full"
                  initialRadius={0}
                  activeRadius={24}
                  priority
                  quality={82}
                  deferReveal
                  deferRevealMs={1200}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
