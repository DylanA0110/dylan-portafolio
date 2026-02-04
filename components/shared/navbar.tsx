'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Sobre mí', href: '/#about' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/image.jpg"
                  alt="Dylan Araica"
                  fill
                  sizes="48px"
                  priority
                  quality={80}
                  className="object-cover rounded-full border-2 border-primary"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  DESARROLLADOR
                </span>
                <span className="font-script text-lg text-primary leading-none">
                  Dylan Araica
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.span
                  className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer uppercase tracking-wide"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Side - Logo */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/DylanA0110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dylan-araica-664354274"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-sm font-medium text-white/80 hover:text-primary transition-colors uppercase">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
