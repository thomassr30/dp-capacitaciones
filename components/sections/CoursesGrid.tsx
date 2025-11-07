'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Course {
  id: string;
  name: string;
  icon: string;
  objectives: string[];
  duration: string;
  modality: string;
}

const courses: Course[] = [
  {
    id: 'svb',
    name: 'Soporte Vital Básico (SVB)',
    icon: 'heart',
    objectives: [
      'Reconoce paro cardíaco',
      'Inicia RCP de alta calidad',
      'Integra DEA con seguridad',
    ],
    duration: '8 horas',
    modality: 'Presencial',
  },
  {
    id: 'trauma',
    name: 'Trauma',
    icon: 'heart',
    objectives: [
      'Control de hemorragias',
      'Manejo inicial',
      'Evaluación rápida y priorización',
    ],
    duration: '16 horas',
    modality: 'Presencial',
  },
  {
    id: 'inmovilizacion',
    name: 'Inmovilización Selectiva',
    icon: 'heart',
    objectives: [
      'Técnicas de inmovilización',
      'Evaluación de lesiones',
      'Protocolos de seguridad',
    ],
    duration: '12 horas',
    modality: 'Presencial',
  },
  {
    id: 'primeros-auxilios',
    name: 'Primeros Auxilios',
    icon: 'heart',
    objectives: [
      'Atención inicial de emergencias',
      'Manejo de heridas y quemaduras',
      'Situaciones de emergencia comunes',
    ],
    duration: '8 horas',
    modality: 'Presencial',
  },
  {
    id: 'hemorragias',
    name: 'Control de Hemorragias',
    icon: 'heart',
    objectives: [
      'Identificación de hemorragias',
      'Técnicas de control',
      'Uso de torniquete',
    ],
    duration: '6 horas',
    modality: 'Presencial',
  },
  {
    id: 'vvp',
    name: 'Canalización de Vías Venosas Periféricas',
    icon: 'heart',
    objectives: [
      'Asepsia y anatomía aplicada',
      'Técnica segura',
      'Complicaciones y prevención',
    ],
    duration: '12 horas',
    modality: 'Presencial',
  },
];

const iconMap: { [key: string]: React.ReactElement } = {
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  support: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  medical: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  ),
  drop: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  ),
  syringe: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  ),
};

export default function CoursesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Stagger animation for cards con fromTo para asegurar que terminen visibles
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
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
      id="cursos"
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Nuestros Cursos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende protocolos validados y prácticas simuladas que transfieren a
            la realidad clínica
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={addToRefs}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {iconMap[course.icon]}
                </svg>
              </div>

              {/* Course Name */}
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {course.name}
              </h3>

              {/* Objectives */}
              <ul className="space-y-2 mb-6 flex-grow">
                {course.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start text-gray-600">
                    <svg
                      className="w-5 h-5 text-secondary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
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
                  {course.duration}
                </div>
                <div className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-medium">
                  {course.modality}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const phoneNumber = '56991487863';
                  const message = `Hola, quisiera saber más sobre el curso de ${course.name}`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Saber más
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
