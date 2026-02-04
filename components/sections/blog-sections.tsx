'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog';

export function BlogSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="blog">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-balance">
            Últimas <span className="text-primary">publicaciones</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Ideas sobre desarrollo web, diseño y el mundo tech que no para de
            moverse
          </p>
        </motion.div>

        {/* Blog Grid / Empty State */}
        {blogPosts.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">
                  No hay artículos por ahora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aún no he publicado posts. Próximamente estará conectado con
                  Sanity.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Los posts se renderizarán aquí cuando conecte Sanity */}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <motion.button
              className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ir al blog
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
