'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    id: 1,
    title: 'Simulación con casos reales',
    description:
      'Entrena en escenarios que imitan el estrés real, preparándote para situaciones críticas del día a día.',
    icon: 'simulation',
  },
  {
    id: 2,
    title: 'Instructor clínico activo',
    description:
      'Aprende de profesionales con experiencia en urgencias reales, que llevan la teoría a la práctica.',
    icon: 'instructor',
  },
  {
    id: 3,
    title: 'Feedback personalizado 1:1',
    description:
      'Recibe retroalimentación clínica accionable que mejora tu técnica y toma de decisiones.',
    icon: 'feedback',
  },
  {
    id: 4,
    title: 'Evaluación práctica',
    description:
      'Demuestra tus competencias en evaluaciones hands-on que certifican tu nivel de preparación.',
    icon: 'evaluation',
  },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      pillarsRef.current.forEach((pillar, index) => {
        const icon = pillar.querySelector('.pillar-icon');
        const text = pillar.querySelector('.pillar-text');
        const underline = pillar.querySelector('.pillar-underline');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: pillar,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
          .from(icon, {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out',
          })
          .from(
            text,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.3'
          )
          .from(
            underline,
            {
              width: 0,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.3'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !pillarsRef.current.includes(el)) {
      pillarsRef.current.push(el);
    }
  };

  return (
    <section id="metodologia" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Nuestra Metodología
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entrena en escenarios que imitan el estrés real, con feedback clínico
            accionable
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <div key={pillar.id} ref={addToRefs} className="relative">
              {/* Icon */}
              <div className="pillar-icon mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {pillar.icon === 'simulation' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    )}
                    {pillar.icon === 'instructor' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    )}
                    {pillar.icon === 'feedback' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    )}
                    {pillar.icon === 'evaluation' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="pillar-text">
                <h3 className="text-2xl font-bold text-foreground mb-3 relative inline-block">
                  {pillar.title}
                  <div className="pillar-underline absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </h3>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Mosaic */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden group"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
