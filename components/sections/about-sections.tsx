'use client';

import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'Perfil',
    description:
      'Estudiante de 4to año de Ingeniería de Sistemas en la UNI. Combinando la disciplina académica con la pasión por el ecosistema de React, Next.js y TypeScript para crear web apps sólidas.',
  },
  {
    number: '02',
    title: 'Enfoque',
    description:
      'No me gusta lo aburrido. Me centro en interfaces que se vean increíbles y funcionen rápido. Mi meta es transformar ideas complejas en experiencias digitales fluidas y con un diseño que pegue fuerte.',
  },
  {
    number: '03',
    title: 'Colaboración',
    description:
      'Listo para integrarme en equipos que busquen soluciones innovadoras. Aporto código limpio, ganas de seguir aprendiendo y una visión moderna para resolver problemas reales.',
  },
];

export function AboutSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden bg-black"
      id="about"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0f1a] via-black to-black opacity-50" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Features Grid - Like the reference design */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group text-center"
            >
              {/* Number and Title */}
              <div className="mb-4">
                <h3 className="text-white text-xl font-bold mb-1">
                  <span className="text-primary">{feature.number}</span>{' '}
                  {feature.title}
                </h3>
                <div className="w-16 h-0.5 bg-primary mx-auto" />
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom border accent on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
