'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-foreground' : 'text-white'}`}>
              Capacitaciones
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#cursos"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Cursos
            </Link>
            <Link
              href="#galeria"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Galería
            </Link>
            <Link
              href="#metodologia"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Metodología
            </Link>
            <Link
              href="#testimonios"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Testimonios
            </Link>
            <Link
              href="#faq"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="#contacto"
              className={`hover:text-primary transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Contacto
            </Link>
            <Link
              href="#contacto"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Inscríbete
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-foreground' : 'text-white'}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href="#cursos"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link
                href="#galeria"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="#metodologia"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Metodología
              </Link>
              <Link
                href="#testimonios"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonios
              </Link>
              <Link
                href="#faq"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#contacto"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="#contacto"
                className="mx-4 bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscríbete
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
