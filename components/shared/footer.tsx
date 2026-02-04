'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/DylanA0110', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/dylan-araica-664354274',
      label: 'LinkedIn',
    },
    { icon: Mail, href: 'mailto:dylanjo0606@gmail.com', label: 'Correo' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black" id="contact">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">DYLAN ARAICA</h3>
            <p className="text-gray-400 leading-relaxed">
              Desarrollador Frontend
            </p>
            <p className="text-gray-400 leading-relaxed">
              Me gusta crear interfaces modernas, rápidas y con personalidad. Si
              tienes una idea, la convertimos en una experiencia web que se
              sienta brutal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Enlaces rápidos
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Sobre mí', href: '/#about' },
                { label: 'Proyectos', href: '/#projects' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contacto', href: '/#contact' },
              ].map((link) => (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    className="text-gray-400 hover:text-primary transition-colors cursor-pointer inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contacto
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href}>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-4 h-4 text-white" />
                    <span className="sr-only">{social.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-400">dylanjo0606@gmail.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Dylan Araica. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-1 bg-primary" />
    </footer>
  );
}
