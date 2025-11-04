'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Subtle pulsing background animation
    gsap.to(bgRef.current, {
      opacity: 0.07,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden"
    >
      {/* Animated ECG Background Pattern */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline fill='none' stroke='white' stroke-width='2' points='0,50 100,50 120,50 130,20 140,80 150,50 300,50 320,50 330,20 340,80 350,50 500,50 520,50 530,20 540,80 550,50 700,50 720,50 730,20 740,80 750,50 1000,50'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          ¿Listo para entrenar?
        </h2>
        <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          Da el siguiente paso en tu desarrollo profesional. Inscríbete hoy y
          transforma tu práctica clínica.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#calendario"
            className="group px-10 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-2xl w-full sm:w-auto"
          >
            Ver calendario de cursos
            <svg
              className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="#contacto"
            className="px-10 py-4 bg-white hover:bg-white/90 text-primary rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-2xl w-full sm:w-auto"
          >
            Hablar con asesor
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Certificación oficial
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Modalidad flexible
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            +5,000 profesionales formados
          </div>
        </div>
      </div>
    </section>
  );
}
