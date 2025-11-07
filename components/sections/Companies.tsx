'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Instructor {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  image: string;
}

// Lista de instructores
const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Instructor Principal',
    title: 'Especialista Certificado en Soporte Vital y Emergencias',
    credentials: [
      'Instructor Basic Life Support - American Heart Association (AHA)',
      'Instructor NAEMT - PHTLS, TECC, AHDR',
      'Instructor ECSI - BLS, WFA, WAFA',
      'Combat Casualty Care Course - Armada de Chile',
      'Sistema de Gestión de Calidad ISO 9001',
    ],
    image: '/instructor1.webp',
  },
  {
    id: '2',
    name: 'Instructor Certificado',
    title: 'Especialista en Emergencias y Rescate',
    credentials: [
      'Instructor RCP',
      'Control de Hemorragia',
      'Uso de Equipos DEA',
      'Primeros Auxilios',
      'Instructor GRIMP Nivel 3',
      'Instructor Rescate en Mina Subterránea',
    ],
    image: '/instructor2.webp',
  },
];

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Animación del título con efecto más dramático
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -60,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animación de las tarjetas con efecto flip y entrada lateral
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index === 0 ? -100 : 100,
            rotationY: index === 0 ? -90 : 90,
            scale: 0.7,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="instructores"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background via-white to-primary/5 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="instructors-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#instructors-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Nuestros Instructores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profesionales certificados con amplia experiencia en capacitación y atención de emergencias
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {instructors.map((instructor, index) => (
            <div
              key={instructor.id}
              ref={addToRefs}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
              style={{ perspective: '1000px' }}
            >
              <div className="p-8">
                {/* Circular Image */}
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 ring-4 ring-primary/20 shadow-xl">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover object-center"
                      quality={100}
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                    Instructor Certificado
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-primary font-semibold text-lg">
                    {instructor.title}
                  </p>
                </div>

                {/* Credentials */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
                    Credenciales
                  </h4>
                  <ul className="space-y-3">
                    {instructor.credentials.map((credential, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-3 text-gray-700"
                      >
                        <div className="shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4 text-accent"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm leading-relaxed">{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
